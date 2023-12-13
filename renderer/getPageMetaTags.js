// const metaInfo = {
//     description: "Description",
//     title: "Title",
//     fbAppId: "111111111111",
//     ogSiteName: "InondaPods",
//     ogType: "Type",
//     ogTitle: "OG Title",
//     ogDescription: "OG Description",
//     ogImage: "OG Image URL",
//     ogImageWidth: "1200",
//     ogImageHeight: "630",
//     ogImageDescription: "OG Image Description",
//     ogUrl: "OG URL",
//     alAndroidUrl: "Android URL",
//     alAndroidPackage: "Android Package",
//     alAndroidClass: "Android Class",
//     alAndroidAppName: "Android App Name",
//     alIosUrl: "iOS URL",
//     alIosAppStoreId: "iOS App Store ID",
//     alIosAppName: "iOS App Name",
//     twitterTitle: "Twitter Title",
//     twitterDescription: "Twitter Description",
//     twitterImage: "Twitter Image URL",
//     twitterPlayer: "Twitter Player URL",
//     twitterPlayerWidth: "500",
//     twitterPlayerHeight: "400",
//     twitterAppUrlIphone: "Twitter App URL (iPhone)",
//     twitterAppUrlGooglePlay: "Twitter App URL (Google Play)",
//     twitterAppIdIphone: "111111111",
//     twitterAppNameIphone: "InondaPods Podcast Player",
//     twitterAppIdIpad: "111111111",
//     twitterAppNameIpad: "InondaPods Player",
//     twitterAppNameGooglePlay: "InondaPods Podcast Player",
//     twitterAppIdGooglePlay: "com.inondapods.android",
// };
function getPageMetaTags(pageContext) {
    const metaDefault = {
        title: 'EarOne',
        description: 'EarOne Music Hub.'
    }

    let dynamicMeta = {};
    if (pageContext.exports.Page && pageContext.exports.Page.metaTags) {
        dynamicMeta = pageContext.exports.Page.metaTags(pageContext.pageProps);
    }
    return Object.assign({}, metaDefault, dynamicMeta);
}

export { getPageMetaTags }