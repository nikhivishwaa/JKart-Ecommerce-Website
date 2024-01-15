
# Generate checksum by parameters we have
# Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys


print("generateSignature Returns:" + str(Checksum))
print("verifySignature Returns:" + str(verifyChecksum))

# Generate Checksum via String
# initialize JSON String
body = "{\"mid\":\"YOUR_MID_HERE\",\"orderId\":\"YOUR_ORDER_ID_HERE\"}"

# Generate checksum by parameters we have
# Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
Checksum = PaytmChecksum.generateSignature(body, "YOUR_MERCHANT_KEY")
verifyChecksum = PaytmChecksum.verifySignature(body, "YOUR_MERCHANT_KEY", Checksum)

print("generateSignature Returns:" + str(Checksum))
print("verifySignature Returns:" + str(verifyChecksum))