const conf = {
    appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appWriteId: String(import.meta.env.VITE_APPWRITE_ID),
    appWriteDataBase: String(import.meta.env.VITE_DATABASE_ID),
    appWriteCollection: String(import.meta.env.VITE_COLLECTION_ID),
    appWriteBucket: String(import.meta.env.VITE_BUCKET_ID)
}

export default conf;