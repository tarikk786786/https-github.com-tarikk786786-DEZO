import { redirect } from 'next/navigation';

/** Tools Lab rebranded → Growth Lab */
export default function ToolsRedirectPage() {
  redirect('/growth-lab');
}
