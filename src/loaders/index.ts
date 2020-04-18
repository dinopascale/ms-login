import expressLoader from './express';
export default async ({expressApp}) => {
    // mongo loader

    //express loader
    await expressLoader({app: expressApp})
}