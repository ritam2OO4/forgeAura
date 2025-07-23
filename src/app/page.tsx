'use client'

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import React from "react";

const Page = () => {
    const trpc = useTRPC();

    const invoke = useMutation({
        ...trpc.invoke.mutationOptions(),
        onSuccess: () => {
            toast.success("Background Job started!!");
        },
    });

    return (
        <div className="p-4">
            <Button
                disabled={invoke.isPending}
                onClick={() => invoke.mutate({ text: "Ritam" })}
            >
                Invoke Background Job
            </Button>
        </div>
    );
};

export default Page;
