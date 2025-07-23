"use client"

 import {useTRPC} from "@/trpc/client";
import {useSuspenseQuery} from "@tanstack/react-query";

const page = () => {
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.hello.queryOptions({text:"Ritam prefetch"}))
    return (
        <>{JSON.stringify(data)}</>
    );
};
export default page