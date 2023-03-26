declare module '*/Seo.graphql' {
  export const FindPageSeo: any
}

declare module '*/Blog.graphql' {
  export const FindBlog: any
  export const GetAllBlogs: any
}

declare module '*/BlogCategory.graphql' {
  export const GetAllBlogCategories: any
  export const FindBlogCategory: any
  export const GetAllBlogCategoriesSlugs: any
}

declare module '*/SocialMedia.graphql' {
  export const GetAllSocialMedias: any
}

declare module '*/UsefulResource.graphql' {
  export const GetAllUsefulResources: any
  export const GetUsefulResources: any
  export const GetTotalUsefulResources: any
  export const FindUsefulResources: any
}

declare module '*/PageData.graphql' {
  export const FindPageData: any
}

declare module '*/User.graphql' {
  export const Login: any
  export const Register: any
}
