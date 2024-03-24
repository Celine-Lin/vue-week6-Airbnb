import{r as s,o as l,c as d,a as e,b as t,w as n,d as _,e as h,F as f,f as a}from"./index-FxAVU7nn.js";var m={VITE_APP_API_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APP_API_NAME:"vue-week2-new",BASE_URL:"/vue_week6_Airbnb/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const p={id:"home"},k={class:"container",style:{"z-index":"1"}},x={class:"nav justify-content-between align-items-center py-8"},b={class:"d-flex justify-content-between align-items-center"},g=e("button",{class:"btn nav-link text-secondary d-none"},"登出",-1),v=e("main",{class:"w-full min-vh-100 fixed-top d-flex flex-column align-items-center justify-content-center",style:{"z-index":"-1","background-size":"cover","background-position":"center","background-image":`linear-gradient(to bottom,rgb(0 0 0 / 50%),rgb(0 0 0 / 0%)),
        linear-gradient(to top,rgb(0 0 0 / 50%),rgb(0 0 0 / 0%)),
        url('https://images.unsplash.com/photo-1603786420263-ad59136a7409?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`}},[e("h1",{class:"text-secondary"},"Celine's Choice"),e("h5",{class:"text-secondary"}," - 藝術品鑑賞與收藏 - ")],-1),{VITE_APP_API_URL:w}=m,y={data(){return{token:""}},methods:{checkLogin(){if(this.token===""){this.$swal.fire({showConfirmButton:!1,timer:1500,icon:"error",title:"請先登入"}),setTimeout(()=>{this.$router.push("/login")},1500);return}this.$http.post(`${w}/api/user/check`).then(()=>{this.$router.push("/admin/products")}).catch(()=>{this.$swal.fire({toast:!0,position:"bottom-end",showConfirmButton:!1,timer:1500,icon:"error",title:"身份驗證有誤，請重新登入"}),this.$router.push("/login")})}},mounted(){this.token=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1"),this.$http.defaults.headers.common.Authorization=this.token}},P=Object.assign(y,{inheritAttrs:!1},{__name:"UserHome",setup(A){return(i,r)=>{const o=s("RouterLink"),c=s("font-awesome-icon"),u=s("RouterView");return l(),d(f,null,[e("div",p,[e("div",k,[e("nav",x,[t(o,{class:"nav-link text-secondary",to:"/"},{default:n(()=>[a("首頁")]),_:1}),t(o,{class:"nav-link text-secondary",to:"/user/products"},{default:n(()=>[a("產品")]),_:1}),t(o,{class:"nav-link text-secondary",to:"/user/about"},{default:n(()=>[a("關於我們")]),_:1}),e("nav",b,[i.token===""?(l(),_(o,{key:0,class:"nav-link text-secondary",to:"/login"},{default:n(()=>[t(c,{icon:"user"})]),_:1})):h("",!0),g,t(o,{class:"nav-link text-secondary",to:"/user/cart"},{default:n(()=>[t(c,{icon:"cart-shopping"})]),_:1}),e("button",{class:"nav-link text-secondary btn",onClick:r[0]||(r[0]=$=>i.checkLogin())},"進入後台")])])]),v]),t(u)],64)}}});export{P as default};