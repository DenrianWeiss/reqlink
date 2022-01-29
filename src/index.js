/* jshint esversion: 11 */

import { Router } from 'itty-router'
import { getLinkInfo, RegisterUrlOnChainHTML } from './utils/chain.js'

const POLYGON_RPC = 'https://polygon-rpc.com/'
const router = Router()

router.get('/', () => {
  return new Response(RegisterUrlOnChainHTML, {
    headers: { 'Content-Type': 'Content-Type": "text/html' },
  })
})

router.get('/raw/:link', async ({ params }) => {
  let link = decodeURIComponent(params.link)
  return new Response(JSON.stringify(await getLinkInfo(link)), {
    headers: { 'Content-Type': 'application/json' },
  })
})

router.get('/:link', async ({ params }) => {
  let link = decodeURIComponent(params.link)
  let raw = await getLinkInfo(link)
  let url = raw[1]
  if (url == '' || raw[0] == '0x0000000000000000000000000000000000000000') url = '/'
  return new Response(null, {
    status: 302,
    headers: {
      'Location': url
    }
  })
})
/*
router.post('/api/link/add/:token/:link/:target', async ({params}) => {console.log("1145141919"); return await createLink(params)})
router.post('/api/link/del/:token/:link', async ({params}) => {return await deleteLink(params)})

router.get('/:link', async ({params}) => {return await redirect(params)})
*/

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request))
})