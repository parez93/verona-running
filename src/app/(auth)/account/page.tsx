"use client";

import {ReactNode, useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
    User,
    Bell,
    FileText,
    Shield
} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Account} from "@/api/account/account";
import {fetchAccountAction, updateAccountAction} from "@/app/(auth)/account/actions";
import {Toaster} from "@/components/ui/sonner";
import {toast} from "sonner";


interface AccountSettingsProps {
    className?: string;
}

export default function AccountSettings() {
    const [activeTab, setActiveTab] = useState("account");
    const [account, setAccount] = useState<Account | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false); // stato per il salvataggio
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const data = await fetchAccountAction()
                setAccount(data);
            } catch (err) {
                console.error("Error fetching account", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAccount();
    }, []);

    const handleSave = async () => {
        if (!account) return;
        setSaving(true);
        setMessage(null);

        try {
            const updated = await updateAccountAction(account);
            setAccount(updated); // aggiorna lo stato con i dati tornati dal server
            setMessage("✅ Account updated successfully!");
        } catch (err: any) {
            console.error("Error updating account:", err);
            toast.error("Error updating account", {description: err.message});
        } finally {
            setSaving(false);
        }
    };

    // Aggiungi questo handler nella funzione AccountSettings
    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Verifica dimensione massima (es: 800KB)
        if (file.size > 800 * 1024) {
            toast.error("File too large. Max size 800KB");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result as string;

            // Aggiorna lo stato locale
            setAccount((prev) => prev ? {...prev, img_base64: base64} : prev);

            // Aggiorna anche nel backend
            try {
                if (account) {
                    await updateAccountAction({...account, img_base64: base64});
                    toast.success("Avatar updated successfully!");
                }
            } catch (err: any) {
                console.error("Error updating avatar:", err);
                toast.error("Error updating avatar", {description: err.message});
            }
        };
        reader.readAsDataURL(file);
    };


    if (loading) return <div>Loading account...</div>;
    if (!account) return <div>Account not found</div>;
    //if (account) return <div>Account found {account.uuid}</div>;

    return (
        <div className={`space-y-6`}>
            {/* Settings Tabs */}
            <Card className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <CardHeader className="p-0">
                        <TabsList className="grid w-full grid-cols-4 h-12 bg-white">
                            <TabsTrigger value="account"
                                         className="
      flex items-center justify-center space-x-2
      rounded-none
      border-b-2 border-transparent
      bg-white
      text-gray-600
      data-[state=active]:text-purple-700
      data-[state=active]:border-b-purple-700
      data-[state=active]:shadow-white
      data-[state=active]:bg-white
    "
                            >
                                <User className="h-4 w-4"/>
                                <span>Account</span>
                            </TabsTrigger>
                            {/*                    <TabsTrigger value="notifications" className="flex items-center space-x-2">
                        <Bell className="h-4 w-4" />
                        <span>Notifications</span>
                    </TabsTrigger>
                    <TabsTrigger value="bills" className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>Bills</span>
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <span>Security</span>
                    </TabsTrigger>*/}
                        </TabsList>
                    </CardHeader>
                    {/* Account Tab */}
                    <CardContent className="pb-6">

                        <TabsContent value="account" className="space-y-6">
                            {/*                                <Card className="border-0">
                                    <CardContent className="space-y-8 p-6">*/}
                            <div className="grid gap-6 lg:grid-cols-2">
                                {/* Change Profile Card */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg font-semibold text-gray-800">Change
                                            Profile</CardTitle>
                                        <p className="text-sm text-gray-500">Change your profile picture
                                            from
                                            here</p>
                                    </CardHeader>
                                    <CardContent className="flex flex-col items-center space-y-4">
                                        {/* Avatar - Using generated image */}
                                        <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-100">
                                            <Avatar
                                                className="AvatarRoot w-24 h-24 rounded-full overflow-hidden bg-blue-100">
                                                <AvatarImage
                                                    className="AvatarImage"
                                                    src={account.img_base64}
                                                    alt="Colm Tuite"
                                                />
                                                <AvatarFallback className="AvatarFallback" delayMs={600}>
                                                    {account.name?.charAt(0).toUpperCase()}{account.surname?.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex space-x-3">
                                            <input
                                                type="file"
                                                accept="image/png, image/jpeg, image/gif"
                                                id="avatar-upload"
                                                className="hidden"
                                                onChange={handleUpload}
                                            />
                                            <Button
                                                className="bg-[#8516F4] hover:bg-[#7014D1] text-white px-6"
                                                onClick={() => document.getElementById("avatar-upload")?.click()}
                                            >
                                                Upload
                                            </Button>
                                            <Button variant="destructive"
                                                    className="bg-[#FFEBEE] text-[#FF3B3B] hover:bg-[#FFCDD2] px-6"
                                                    onClick={async () => {
                                                        setAccount((prev) => prev ? {...prev, img_base64: ""} : prev);
                                                        if (account) await updateAccountAction({
                                                            ...account,
                                                            img_base64: ""
                                                        });
                                                    }}>
                                                Reset
                                            </Button>
                                        </div>

                                        <p className="text-xs text-gray-400 text-center">
                                            Allowed JPG, GIF or PNG. Max size of 800K
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Change Password Card */}
                                {/*
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg font-semibold text-gray-800">Change
                                                Password</CardTitle>
                                            <p className="text-sm text-gray-500">To change your password please
                                                confirm
                                                here</p>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="currentPassword"
                                                       className="text-sm font-medium text-gray-700">
                                                    Current Password
                                                </Label>
                                                <Input
                                                    id="currentPassword"
                                                    type="password"
                                                    placeholder="••••••••••"
                                                    className="h-10 border-gray-200"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="newPassword"
                                                       className="text-sm font-medium text-gray-700">
                                                    New Password
                                                </Label>
                                                <Input
                                                    id="newPassword"
                                                    type="password"
                                                    placeholder="••••••••••"
                                                    className="h-10 border-gray-200"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="confirmPassword"
                                                       className="text-sm font-medium text-gray-700">
                                                    Confirm Password
                                                </Label>
                                                <Input
                                                    id="confirmPassword"
                                                    type="password"
                                                    placeholder="••••••••••"
                                                    className="h-10 border-gray-200"
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
*/}
                            </div>

                            {/* Personal Details Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold text-gray-800">Personal
                                        Details</CardTitle>
                                    <p className="text-sm text-gray-500">To change your personal detail,
                                        edit and
                                        save from here</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6 lg:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name"
                                                   className="text-sm font-medium text-gray-700">
                                                Name
                                            </Label>
                                            <Input
                                                id="name"
                                                placeholder="Mario"
                                                className="h-10 border-gray-200"
                                                value={account?.name ?? ""}
                                                onChange={(e) =>
                                                    setAccount((prev) => prev ? {...prev, name: e.target.value} : prev)
                                                }
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="surname"
                                                   className="text-sm font-medium text-gray-700">
                                                Surname
                                            </Label>
                                            <Input
                                                id="surname"
                                                placeholder="Rossi"
                                                className="h-10 border-gray-200"
                                                value={account?.surname ?? ""}
                                                onChange={(e) =>
                                                    setAccount((prev) => prev ? {
                                                        ...prev,
                                                        surname: e.target.value
                                                    } : prev)
                                                }
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="birthday"
                                                   className="text-sm font-medium text-gray-700">
                                                Date of birth
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="birthday"
                                                    type="date"
                                                    className="h-10 border-gray-200 pr-10
                                            [&::-webkit-calendar-picker-indicator]:absolute
                                            [&::-webkit-calendar-picker-indicator]:right-3
                                            [&::-webkit-calendar-picker-indicator]:top-1/2
                                            [&::-webkit-calendar-picker-indicator]:-translate-y-1/2
                                            [&::-webkit-calendar-picker-indicator]:h-4
                                            [&::-webkit-calendar-picker-indicator]:w-4
                                            "
                                                    value={
                                                        account?.date_of_birth
                                                            ? new Date(account.date_of_birth).toISOString().split("T")[0]
                                                            : ""
                                                    }
                                                    onChange={(e) =>
                                                        setAccount((prev) =>
                                                            prev ? {...prev, date_of_birth: e.target.value} : prev
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>

                                        {/*                                <div className="space-y-2">
                                    <Label htmlFor="currency" className="text-sm font-medium text-gray-700">
                                        Currency
                                    </Label>
                                    <Input
                                        id="currency"
                                        className="h-10 border-gray-200"
                                    />
                                </div>*/}
                                    </div>
                                </CardContent>
                            </Card>
                            {/*                                    </CardContent>
                                </Card>*/}
                        </TabsContent>

                        {/* Other Tabs (placeholder content) */}
                        {/*                <TabsContent value="notifications" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Notification preferences will be displayed here.</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="bills" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Billing Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Billing and payment information will be displayed here.</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Security preferences and settings will be displayed here.</p>
                        </CardContent>
                    </Card>
                </TabsContent>*/}

                        <div className="flex space-x-3 flex-row-reverse pt-6">
                            <Button
                                onClick={handleSave}
                                disabled={saving}
                                className="bg-[#8516F4] hover:bg-[#7014D1] text-white px-6"
                            >
                                {saving ? "Saving..." : "Save"}
                            </Button>

                        </div>

                        <Toaster/>
                    </CardContent>

                </Tabs>
            </Card>
        </div>
    );
}


