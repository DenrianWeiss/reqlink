/* jshint esversion: 11 */

import {token} from '../config/config.js';
import {kvGet, kvSet, kvDel} from './kv.js';
import {NotFound} from '../templates/notfound.js';

export function verifyToken(vToken) {
    return token === vToken;
}

export async function createLink(params) {
    let link = decodeURIComponent(params.link);
    let target = decodeURIComponent(params.target);
    let token = decodeURIComponent(params.token);
    if(!verifyToken(token)) {
        return Response(`{"status": "denied"}`, {
            headers: { 'Content-Type': 'application/json' },
          }
        )
    }
    let r = await kvGet('link', link)
    if(r !== null) {
        return Response(`{"status": "exist"}`, {
            headers: { 'Content-Type': 'application/json' },
          }
        )
    }
    await kvSet('link', link, JSON.stringify({ 
        "target": target,
    }))
    return Response(`{"status": "ok"}`, {
        headers: { 'Content-Type': 'application/json' },
      }
    )
}

export async function deleteLink(params) {
    let link = decodeURIComponent(params.link);
    let token = decodeURIComponent(params.token);
    if(!verifyToken(token)) {
        return Response(`{"status": "denied"}`, {
            headers: { 'Content-Type': 'application/json' },
          }
        )
    }
    let r = await kvGet('link', link)
    if(r === null) {
        return Response(`{"status": "not exist"}`, {
            headers: { 'Content-Type': 'application/json' },
          }
        )
    }
    await kvDel('link', link)
    return Response(`{"status": "ok"}`, {
        headers: { 'Content-Type': 'application/json' },
      }
    )
}

export async function redirect(params) {
    let link = decodeURIComponent(params.link);
    let r = await kvGet('link', link)
    if(r === null) {
        return Response(NotFound(), {
            headers: { 'Content-Type': 'text/html'}
        })
    }
    return new Response("Redirecting", {
        status: 302,
        headers: {
          'Location': r.target
        }
    })
}