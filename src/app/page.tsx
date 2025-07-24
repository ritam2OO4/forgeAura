'use client'

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import React, {useState} from "react";
import {Input} from "@/components/ui/input";

const Page = () => {
    const [value,setValue]=useState("")
    const trpc = useTRPC();

    const invoke = useMutation({
        ...trpc.invoke.mutationOptions(),
        onSuccess: () => {
            toast.success("Background Job started!!");
        },
    });

    return (
        <div className="p-4">
            <Input onChange={(e)=>(setValue(e.target.value))} />
            <Button
                disabled={invoke.isPending}
                onClick={() => invoke.mutate({ value: value })}
            >
                Invoke Background Job
            </Button>
        </div>
    );
};

export default Page;
