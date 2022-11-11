// Type from node_modules/.prisma/client/index.d.ts

/**
 * Model User
 *
 */
export type User = {
    id: number;
    email: string;
    username: string;
    password: string;
    role: UserRole;
    permission: number;
    createdAt: Date;
    updatedAt: Date;
    passwordHistory: string[];
};

/**
 * Model Post
 *
 */
export type Post = {
    id: number;
    type: PostType;
    title: string;
    content: string | null;
    isAnonymous: boolean;
    published: boolean;
    isPrivate: boolean;
    password: string | null;
    watchPermission: number;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
};

/**
 * Model Comment
 *
 */
export type Comment = {
    id: number;
    content: string;
    authorId: number;
    postId: number;
    parentId: number | null;
    createdAt: Date;
    updatedAt: Date;
};

/**
 * Model LikeDislike
 *
 */
export type LikeDislike = {
    id: number;
    type: LikeOrDisLike;
    authorId: number;
    postId: number | null;
    commentId: number | null;
    createdAt: Date;
    updatedAt: Date;
};

/**
 * Model Watched
 *
 */
export type Watched = {
    id: number;
    postId: number;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
};

/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const LikeOrDisLike: {
    LIKE: 'LIKE';
    DISLIKE: 'DISLIKE';
};

export type LikeOrDisLike = typeof LikeOrDisLike[keyof typeof LikeOrDisLike];

export const PostType: {
    ANNOUNCEMENT: 'ANNOUNCEMENT';
    POST: 'POST';
    COMMENT: 'COMMENT';
};

export type PostType = typeof PostType[keyof typeof PostType];

export const UserRole: {
    ADMIN: 'ADMIN';
    USER: 'USER';
};

export type UserRole = typeof UserRole[keyof typeof UserRole];
