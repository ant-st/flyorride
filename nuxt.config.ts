// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt'],
    //@ts-ignore
    head: { script: [ { src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCFmoAQ5iDUdiz36GcaXskcXPFFgdaa4Dw",},],}
})

