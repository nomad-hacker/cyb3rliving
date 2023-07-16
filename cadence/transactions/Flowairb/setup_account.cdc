import FlowairbV2 from "../../contracts/FlowairbV2.cdc"

// This transaction installs the Storefront ressource in an account.

transaction {
    prepare(acct: AuthAccount) {

        // If the account doesn't already have a Storefront
        if acct.borrow<&FlowairbV2.Storefront>(from: FlowairbV2.StorefrontStoragePath) == nil {

            // Create a new empty Storefront
            let storefront <- FlowairbV2.createStorefront() as! @FlowairbV2.Storefront
            
            // save it to the account
            acct.save(<-storefront, to: FlowairbV2.StorefrontStoragePath)

            // create a public capability for the Storefront
            acct.link<&FlowairbV2.Storefront{FlowairbV2.StorefrontPublic}>(FlowairbV2.StorefrontPublicPath, target: FlowairbV2.StorefrontStoragePath)
        }
    }
}
