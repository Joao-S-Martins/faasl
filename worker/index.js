// The site's Worker. Static pages are served straight from the build (free
// and unlimited); only /api/* reaches this code (run_worker_first in
// wrangler.jsonc). docs/services.md §1.
import { EmailMessage } from 'cloudflare:email';
import { handleContact } from './contact.js';

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/contact') {
      if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
      }
      return handleContact(request, env, {
        // The send_email binding is only added at launch (docs/deployment.md)
        send: env.EMAIL
          ? (from, to, raw) => env.EMAIL.send(new EmailMessage(from, to, raw))
          : undefined,
      });
    }
    return env.ASSETS.fetch(request);
  },
};
