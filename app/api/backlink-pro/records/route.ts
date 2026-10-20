import { NextRequest, NextResponse } from 'next/server';
import { backlinkStore } from '@/lib/backlink-pro/store';
import { verifySingleBacklink } from '@/lib/backlink-pro/verifier';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const status = searchParams.get('status');
  const category = searchParams.get('category');
  const search = searchParams.get('q')?.toLowerCase();

  let records = backlinkStore.getAllRecords();

  if (status && status !== 'all') {
    records = records.filter((r) => r.status === status);
  }

  if (category && category !== 'all') {
    records = records.filter((r) => r.category === category);
  }

  if (search) {
    records = records.filter(
      (r) =>
        r.sourceUrl.toLowerCase().includes(search) ||
        r.referringDomain.toLowerCase().includes(search) ||
        r.anchorText.toLowerCase().includes(search) ||
        r.niche.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({
    success: true,
    campaign: backlinkStore.getCampaign(),
    total: records.length,
    records,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const action = body.action || 'create';

    // 1. Bulk Add Records
    if (action === 'bulk_add') {
      const items = body.records || [];
      const res = backlinkStore.addRecords(items);
      return NextResponse.json({
        success: true,
        added: res.added,
        duplicates: res.duplicates,
        campaign: backlinkStore.getCampaign(),
      });
    }

    // 2. Trigger Real-Time Single URL Verification
    if (action === 'verify_single') {
      const { id, sourceUrl, targetDomain } = body;
      const result = await verifySingleBacklink(sourceUrl, targetDomain || 'dezo.in');
      
      const newStatus = result.linkFound ? 'verified_live' : (result.httpStatus === 404 || result.httpStatus === 0 ? 'failed' : 'lost');
      
      if (id) {
        backlinkStore.updateRecordStatus(id, newStatus, {
          httpStatus: result.httpStatus,
          linkFoundInHtml: result.linkFound,
          actualAnchorText: result.foundAnchor,
          lastVerifiedAt: result.linkFound ? result.checkedAt : undefined,
        });
      }

      return NextResponse.json({
        success: true,
        verification: result,
        recordStatus: newStatus,
      });
    }

    // 3. Import Catalog Action
    if (action === 'import_catalog') {
      const res = backlinkStore.importFromCatalog();
      return NextResponse.json({
        success: true,
        added: res.added,
        duplicates: res.duplicates,
        campaign: backlinkStore.getCampaign(),
      });
    }

    // 4. Get Catalog
    if (action === 'get_catalog') {
      return NextResponse.json({
        success: true,
        catalog: backlinkStore.getCatalog(),
      });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
