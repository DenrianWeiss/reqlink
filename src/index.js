/* jshint esversion: 11 */

import { Router } from 'itty-router'
import { getLinkInfo, RegisterUrlOnChainHTML } from './utils/chain.js'
import { createLink, deleteLink, redirect} from './utils/link.js'

const POLYGON_RPC = 'https://polygon-rpc.com/'
const router = Router()

router.get('/bc', () => {
  return new Response(RegisterUrlOnChainHTML, {
    headers: { 'Content-Type': 'Content-Type": "text/html' },
  })
})

router.get('/raw/bc/:link', async ({ params }) => {
  let link = decodeURIComponent(params.link)
  return new Response(JSON.stringify(await getLinkInfo(link)), {
    headers: { 'Content-Type': 'application/json' },
  })
})

router.get('/bc/:link', async ({ params }) => {
  let link = decodeURIComponent(params.link)
  return new Response("Redirecting", {
    status: 302,
    headers: {
      'Location': (await getLinkInfo(link))[1]
    }
  })
})

router.post('/api/link/add/:token/:link/:target', createLink)

router.post('/api/link/del/:token/:link', deleteLink)

router.get('/:link', redirect)

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request))
})