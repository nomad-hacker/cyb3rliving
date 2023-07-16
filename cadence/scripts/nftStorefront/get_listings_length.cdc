import FlowairbV2 from "../../contracts/FlowairbV2.cdc"

// This script returns the number of NFTs for sale in a given account's storefront.

pub fun main(address: Address): Int {
    let account = getAccount(address)

    let storefrontRef = account
        .getCapability<&FlowairbV2.Storefront{FlowairbV2.StorefrontPublic}>(
            FlowairbV2.StorefrontPublicPath
        )
        .borrow()
        ?? panic("Could not borrow public storefront from address")
  
    return storefrontRef.getListingIDs().length
}
