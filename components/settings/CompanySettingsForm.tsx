"use client";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  CompanySettingsInput,
  companySettingsSchema,
} from "@/lib/validations/company-settings";

import { updateCompanySettingsAction } from "@/actions/settings/updateCompanySettings";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CompanySettingsFormProps {
  settings: {
    companyName: string;
    supportEmail: string;
    supportPhone: string;
    primaryColor: string | null;
    logo: string | null;
  };
}

export default function CompanySettingsForm({
  settings,
}: CompanySettingsFormProps) {
  const [isPending, startTransition] =
    useTransition();

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const form = useForm<CompanySettingsInput>({
    resolver: zodResolver(
      companySettingsSchema
    ),

    defaultValues: {
      companyName: settings.companyName,

      supportEmail: settings.supportEmail,

      supportPhone: settings.supportPhone,

      primaryColor:
        settings.primaryColor ?? "#f97316",

      logo: settings.logo ?? "",
    },
  });

  function onSubmit(
    values: CompanySettingsInput
  ) {
    setSuccess("");
    setError("");

    startTransition(async () => {
      const result =
        await updateCompanySettingsAction(
          values
        );

      if (!result.success) {
        setError(
          "Unable to update company settings."
        );

        return;
      }

      setSuccess(
        "Company settings updated successfully."
      );
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold">
          Company Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Company Name
            </label>

            <Input
              {...form.register("companyName")}
            />

            <p className="mt-1 text-sm text-red-500">
              {
                form.formState.errors
                  .companyName?.message
              }
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Support Email
            </label>

            <Input
              type="email"
              {...form.register(
                "supportEmail"
              )}
            />

            <p className="mt-1 text-sm text-red-500">
              {
                form.formState.errors
                  .supportEmail?.message
              }
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Support Phone
            </label>

            <Input
              {...form.register(
                "supportPhone"
              )}
            />

            <p className="mt-1 text-sm text-red-500">
              {
                form.formState.errors
                  .supportPhone?.message
              }
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Primary Color
            </label>

            <Input
              type="color"
              {...form.register(
                "primaryColor"
              )}
              className="h-12"
            />

            <p className="mt-1 text-sm text-red-500">
              {
                form.formState.errors
                  .primaryColor?.message
              }
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Logo URL
            </label>

            <Input
              placeholder="https://example.com/logo.png"
              {...form.register("logo")}
            />

            <p className="mt-1 text-sm text-red-500">
              {
                form.formState.errors.logo
                  ?.message
              }
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
            {success}
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
          >
            {isPending
              ? "Saving..."
              : "Save Changes"}
          </Button>
        </div>
      </div>
    </form>
  );
}