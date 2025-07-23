import {getQueryClient,trpc} from '@/trpc/server';
import {Suspense} from "react";
import {HydrationBoundary} from "@tanstack/react-query";
import Client from "./client"
import {dehydrate} from "@tanstack/query-core";
const Page = async ()=>{
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.hello.queryOptions({text:"Ritam prefetch"}))
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<p>...Loading</p>}>
                <Client/>
            </Suspense>
        </HydrationBoundary>
    );
}

export default Page;