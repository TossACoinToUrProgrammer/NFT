type AppConfigProps = {
  publicToken: string
  previewToken: string
  rootDirectory?: string
}

export const CONFIG: AppConfigProps = {
  previewToken: process.env.NEXT_PUBLIC_PREVIEW_TOKEN || '',
  publicToken: (process.env.NEXT_PUBLIC_PREVIEW_MODE ? process.env.NEXT_PUBLIC_PREVIEW_TOKEN : process.env.NEXT_PUBLIC_PUBLIC_TOKEN) || '',
  rootDirectory: process.env.NEXT_PUBLIC_ROOT_DIRECTORY,
}
