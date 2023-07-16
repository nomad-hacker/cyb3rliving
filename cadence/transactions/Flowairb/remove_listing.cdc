import FlowairbV2 from "../contracts/FlowairbV2.cdc"

/// Transaction to facilitate the removal of listing by the
/// listing owner.
/// Listing owner should provide the `listingResourceID` that
/// needs to be removed.

transaction(listingResourceID: UInt64) {
    let storefront: &FlowairbV2.Storefront{FlowairbV2.StorefrontManager}

    prepare(acct: AuthAccount) {
        self.storefront = acct.borrow<&FlowairbV2.Storefront{FlowairbV2.StorefrontManager}>(from: FlowairbV2.StorefrontStoragePath)
            ?? panic("Missing or mis-typed FlowairbV2.Storefront")
    }

    execute {
        self.storefront.removeListing(listingResourceID: listingResourceID)
    }
}