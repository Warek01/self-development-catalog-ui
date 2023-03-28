/** change src attribute of images in html string to **NEXT_PUBLIC_STRAPI_URL** base */
const preprocessImgSrc = (htmlStr: string) => {
  return htmlStr.replaceAll('src="', `src=\"${process.env.NEXT_PUBLIC_STRAPI_URL}`)
}

export default preprocessImgSrc
