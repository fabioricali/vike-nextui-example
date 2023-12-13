export default function createSocialsObject (linkToShare, descriptionToShare) {
    return [
        {
            type: 'facebook',
            url: `https://www.facebook.com/sharer.php?u=${linkToShare}`
        },
        {
            type: 'x',
            url: `https://twitter.com/share?url=${linkToShare}&text=${descriptionToShare}`
        },
        {
            type: 'whatsapp',
            url: `https://api.whatsapp.com/send?text=${descriptionToShare}%20${linkToShare}`
        },
        {
            type: 'pinterest',
            url: `https://pinterest.com/pin/create/button/?url=${linkToShare}&description=${descriptionToShare}`
        },
        {
            type: 'linkedin',
            url: `https://www.linkedin.com/shareArticle?mini=true&url=${linkToShare}&title=${descriptionToShare}`
        },
    ];
}