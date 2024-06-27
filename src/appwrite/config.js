import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../Conf/conf";

export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    };

    async createPost({ title, content, slug, image, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appWriteDataBase,
                conf.appWriteCollection,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                    userId
                });
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        };

    };

    async updatePost(slug, { title, content, image, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appWriteDataBase,
                conf.appWriteCollection,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                });
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    };

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appWriteDataBase,
                conf.appWriteCollection,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        };
    };

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appWriteDataBase,
                conf.appWriteCollection,
                slug
            );
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        };



    };

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appWriteDataBase,
                conf.appWriteCollection,
                queries,


            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    //file upload

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appWriteBucket,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        };
    };

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appWriteBucket,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false;
        };
    };

    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            conf.appWriteBucket,
            fileId
        );
    };

};



const service = new Service();
export default service;
