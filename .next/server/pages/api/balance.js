"use strict";(()=>{var e={};e.id=657,e.ids=[657],e.modules={6330:e=>{e.exports=require("@prisma/client")},5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6762:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},1189:(e,t,r)=>{r.r(t),r.d(t,{config:()=>s,default:()=>l,routeModule:()=>c});var n={};r.r(n),r.d(n,{default:()=>d});var a=r(9947),i=r(2706),o=r(6762);let u=new(r(6330)).PrismaClient;async function d(e,t){if("GET"!==e.method)return t.setHeader("Allow",["GET"]),t.status(405).end(`Method ${e.method} Not Allowed`);try{let e=await u.balance.findUnique({where:{id:1}});return e||(e=await u.balance.create({data:{id:1}})),t.status(200).json(e)}catch(e){return console.error("Error fetching balance:",e),t.status(500).json({error:"Internal server error"})}}let l=(0,o.M)(n,"default"),s=(0,o.M)(n,"config"),c=new a.PagesAPIRouteModule({definition:{kind:i.A.PAGES_API,page:"/api/balance",pathname:"/api/balance",bundlePath:"",filename:""},userland:n})},2706:(e,t)=>{Object.defineProperty(t,"A",{enumerable:!0,get:function(){return r}});var r=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},9947:(e,t,r)=>{e.exports=r(5600)}};var t=require("../../webpack-api-runtime.js");t.C(e);var r=t(t.s=1189);module.exports=r})();