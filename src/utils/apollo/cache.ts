import { InMemoryCache } from "@apollo/client";

export default function createCache() {
    return new InMemoryCache()
}