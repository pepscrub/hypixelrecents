import React from 'react';
import AdSense from 'react-adsense';
 
// responsive and native ads
function Ads()
{
    return(
        <AdSense.Google
            client="ca-pub-5211251535508566"
            slot="7528515664"
            style={{ display: 'block' }}
            layout='in-article'
            format='auto'
            responsive='true'
        />
    )
}

export default Ads;