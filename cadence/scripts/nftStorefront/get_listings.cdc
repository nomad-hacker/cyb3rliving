import FlowairbV2 from "../../contracts/FlowairbV2.cdc"

// This script returns an array of all the NFTs uuids for sale through a Storefront

pub fun main(address: Address): [UInt64] {
    let account = getAccount(address)

    let storefrontRef = account
        .getCapability<&FlowairbV2.Storefront{FlowairbV2.StorefrontPublic}>(
            FlowairbV2.StorefrontPublicPath
        )
        .borrow()
        ?? panic("Could not borrow public storefront from address")
    
  	return storefrontRef.getListingIDs()
}
