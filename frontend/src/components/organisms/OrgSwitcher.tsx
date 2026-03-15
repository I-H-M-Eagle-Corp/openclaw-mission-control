"use client";

import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Building2, Plus } from "lucide-react";

import { useAuth } from "@/auth/clerk";
import { ApiError } from "@/api/mutator";
import {
  type listMyOrganizationsApiV1OrganizationsMeListGetResponse,
  useCreateOrganizationApiV1OrganizationsPost,
  useListMyOrganizationsApiV1OrganizationsMeListGet,
  useSetActiveOrgApiV1OrganizationsMeActivePatch,
} from "@/api/generated/organizations/organizations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function OrgSwitcher() {
  // DISABLED: Single org mode for I.H.M. Eagle Corp
  // Multi-tenancy feature removed per customization plan
  return null;
}
