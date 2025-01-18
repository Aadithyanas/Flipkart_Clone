import paytmchecksum from '../paytm/PaytmChecksum.js';
import { paytmParams, paytmMerchantkey } from '../index.js';
import formidable from 'formidable';
import https from 'https';

export const addPaymentGateway = async (request, response) => {
    try {
        const paytmCheckSum = await paytmchecksum.generateSignature(paytmParams, paytmMerchantkey);
        const params = {
            ...paytmParams,
            'CHECKSUMHASH': paytmCheckSum
        };
        response.json(params);
    } catch (error) {
        console.error("Error generating checksum:", error);
        response.status(500).json({ error: "Internal server error" });
    }
}

export const paymentResponse = (request, response) => {
    const form = new formidable.IncomingForm();

    form.parse(request, async (err, fields) => {
        if (err) {
            console.error("Form parsing error:", err);
            return response.status(400).json({ error: "Form parsing error" });
        }

        // Log the incoming form data for debugging
        console.log("Form fields:", fields);

        // Ensure CHECKSUMHASH exists
        const paytmCheckSum = fields.CHECKSUMHASH;
        if (!paytmCheckSum) {
            console.error("Missing CHECKSUMHASH in request body");
            return response.status(400).json({ error: "Missing CHECKSUMHASH" });
        }

        // Remove CHECKSUMHASH before verifying signature
        delete fields.CHECKSUMHASH;

        try {
            const isVerifySignature = paytmchecksum.verifySignature(fields, paytmMerchantkey, paytmCheckSum);
            if (!isVerifySignature) {
                console.error("Checksum verification failed");
                return response.status(400).json({ error: "Checksum verification failed" });
            }

            // Create Paytm parameters for order status
            const paytmParams = {
                "MID": fields.MID,
                "ORDERID": fields.ORDERID,
            };

            // Generate new checksum for verification with Paytm
            const checksum = await paytmchecksum.generateSignature(paytmParams, paytmMerchantkey);
            paytmParams["CHECKSUMHASH"] = checksum;

            const post_data = JSON.stringify(paytmParams);

            const options = {
                hostname: 'securegw-stage.paytm.in',
                port: 443,
                path: '/order/status',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': post_data.length
                }
            };

            let res = "";
            const post_req = https.request(options, function (post_res) {
                post_res.on('data', function (chunk) {
                    res += chunk;
                });

                post_res.on('end', function () {
                    let result = JSON.parse(res);
                    console.log("Paytm Response:", result);

                    // Based on response, redirect or send an appropriate response
                    if (result.STATUS === 'TXN_SUCCESS') {
                        response.redirect(`http://localhost:3000/success?orderid=${fields.ORDERID}`);
                    } else {
                        response.redirect(`http://localhost:3000/failure?orderid=${fields.ORDERID}`);
                    }
                });
            });

            post_req.write(post_data);
            post_req.end();
        } catch (error) {
            console.error("Error during payment response verification:", error);
            response.status(500).json({ error: "Error during payment verification" });
        }
    });
}
