import {encode} from 'html-entities';

/*
const metaInfo = {
    description: "Description",
    title: "Title",
    fbAppId: "111111111111",
    ogSiteName: "InondaPods",
    ogType: "Type",
    ogTitle: "OG Title",
    ogDescription: "OG Description",
    ogImage: "OG Image URL",
    ogImageWidth: "1200",
    ogImageHeight: "630",
    ogImageDescription: "OG Image Description",
    ogUrl: "OG URL",
    alAndroidUrl: "Android URL",
    alAndroidPackage: "Android Package",
    alAndroidClass: "Android Class",
    alAndroidAppName: "Android App Name",
    alIosUrl: "iOS URL",
    alIosAppStoreId: "iOS App Store ID",
    alIosAppName: "iOS App Name",
    twitterTitle: "Twitter Title",
    twitterDescription: "Twitter Description",
    twitterImage: "Twitter Image URL",
    twitterPlayer: "Twitter Player URL",
    twitterPlayerWidth: "500",
    twitterPlayerHeight: "400",
    twitterAppUrlIphone: "Twitter App URL (iPhone)",
    twitterAppUrlGooglePlay: "Twitter App URL (Google Play)",
    twitterAppIdIphone: "111111111",
    twitterAppNameIphone: "InondaPods Podcast Player",
    twitterAppIdIpad: "111111111",
    twitterAppNameIpad: "InondaPods Player",
    twitterAppNameGooglePlay: "InondaPods Podcast Player",
    twitterAppIdGooglePlay: "com.inondapods.android",
};
 */

export const encodeObjectToHtmlEntities = function (obj) {
    const encodedObj = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            encodedObj[key] = encode((obj[key] + '').trim());
        }
    }
    return encodedObj;
}

export const generateHtmlMetaTags = function (meta) {
    meta = encodeObjectToHtmlEntities(meta);

    let template = '';

    if (meta.description) {
        template += `<meta name="description" content="${meta.description}" />\n`;
    }

    if (meta.title) {
        template += `<title>${meta.title}</title>\n`;
    }

    if (meta.fbAppId) {
        template += `<meta property="fb:app_id" content="${meta.fbAppId}" />\n`;
    }

    if (meta.ogSiteName) {
        template += `<meta property="og:site_name" content="${meta.ogSiteName}" />\n`;
    }

    if (meta.ogType) {
        template += `<meta property="og:type" content="${meta.ogType}" />\n`;
    }

    if (meta.ogTitle) {
        template += `<meta property="og:title" content="${meta.ogTitle}" />\n`;
    }

    if (meta.ogDescription) {
        template += `<meta property="og:description" content="${meta.ogDescription}" />\n`;
    }

    if (meta.ogImage) {
        template += `<meta property="og:image" content="${meta.ogImage}" />\n`;
    }

    if (meta.ogImageWidth) {
        template += `<meta property="og:image:width" content="${meta.ogImageWidth}" />\n`;
    }

    if (meta.ogImageHeight) {
        template += `<meta property="og:image:height" content="${meta.ogImageHeight}" />\n`;
    }

    if (meta.ogImageDescription) {
        template += `<meta property="og:image:alt" content="${meta.ogImageDescription}" />\n`;
    }

    if (meta.ogUrl) {
        template += `<meta property="og:url" content="${meta.ogUrl}" />\n`;
    }

    if (meta.alAndroidUrl) {
        template += `<meta property="al:android:url" content="${meta.alAndroidUrl}" />\n`;
    }

    if (meta.alAndroidPackage) {
        template += `<meta property="al:android:package" content="${meta.alAndroidPackage}" />\n`;
    }

    if (meta.alAndroidClass) {
        template += `<meta property="al:android:class" content="${meta.alAndroidClass}" />\n`;
    }

    if (meta.alAndroidAppName) {
        template += `<meta property="al:android:app_name" content="${meta.alAndroidAppName}" />\n`;
    }

    if (meta.alIosUrl) {
        template += `<meta property="al:ios:url" content="${meta.alIosUrl}" />\n`;
    }

    if (meta.alIosAppStoreId) {
        template += `<meta property="al:ios:app_store_id" content="${meta.alIosAppStoreId}" />\n`;
    }

    if (meta.alIosAppName) {
        template += `<meta property="al:ios:app_name" content="${meta.alIosAppName}" />\n`;
    }

    if (meta.twitterTitle) {
        template += `<meta name="twitter:title" content="${meta.twitterTitle}" />\n`;
    }

    if (meta.twitterDescription) {
        template += `<meta name="twitter:description" content="${meta.twitterDescription}" />\n`;
    }

    if (meta.twitterImage) {
        template += `<meta name="twitter:image" content="${meta.twitterImage}" />\n`;
    }

    if (meta.twitterPlayer) {
        template += `<meta name="twitter:player" content="${meta.twitterPlayer}" />\n`;
    }

    if (meta.twitterPlayerWidth) {
        template += `<meta name="twitter:player:width" content="${meta.twitterPlayerWidth}" />\n`;
    }

    if (meta.twitterPlayerHeight) {
        template += `<meta name="twitter:player:height" content="${meta.twitterPlayerHeight}" />\n`;
    }

    if (meta.twitterAppUrlIphone) {
        template += `<meta name="twitter:app:url:iphone" content="${meta.twitterAppUrlIphone}" />\n`;
    }

    if (meta.twitterAppUrlGooglePlay) {
        template += `<meta name="twitter:app:url:googleplay" content="${meta.twitterAppUrlGooglePlay}" />\n`;
    }

    if (meta.twitterAppIdIphone) {
        template += `<meta name="twitter:app:id:iphone" content="${meta.twitterAppIdIphone}" />\n`;
    }

    if (meta.twitterAppNameIphone) {
        template += `<meta name="twitter:app:name:iphone" content="${meta.twitterAppNameIphone}" />\n`;
    }

    if (meta.twitterAppIdIpad) {
        template += `<meta name="twitter:app:id:ipad" content="${meta.twitterAppIdIpad}" />\n`;
    }

    if (meta.twitterAppNameIpad) {
        template += `<meta name="twitter:app:name:ipad" content="${meta.twitterAppNameIpad}" />\n`;
    }

    if (meta.twitterAppNameGooglePlay) {
        template += `<meta name="twitter:app:name:googleplay" content="${meta.twitterAppNameGooglePlay}" />\n`;
    }

    if (meta.twitterAppIdGooglePlay) {
        template += `<meta name="twitter:app:id:googleplay" content="${meta.twitterAppIdGooglePlay}" />\n`;
    }

    return template;
}