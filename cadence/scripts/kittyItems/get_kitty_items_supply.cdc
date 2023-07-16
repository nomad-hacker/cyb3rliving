import HouseListings from "../../contracts/HouseListings.cdc"

// This scripts returns the number of HouseListings currently in existence.

pub fun main(): UInt64 {    
    return HouseListings.totalSupply
}
