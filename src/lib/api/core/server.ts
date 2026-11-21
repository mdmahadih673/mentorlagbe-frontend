import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const getSession = async () => {
    'use server'
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session
}

export const getToken = async () => {
    const token = await auth.api.getToken({ headers: await headers() });
    if (!token?.token) redirect("/sign-in");
    return token.token;
};

export const authFetch = async (api: string) => {
    const token = await getToken()
    const res = await fetch(api, {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    if (res.status === 401 || res.status === 403) {
        redirect('/unauthorized')
    }
    return res
}

export const protectedMutation = async (
    api: string,
    method: "POST" | "PATCH" | "DELETE",
    data?: unknown,
) => {
    const token = await getToken()
    const res = await fetch(api, {
        method,
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: data === undefined ? undefined : JSON.stringify(data),
    })
    if (res.status === 401 || res.status === 403) {
        redirect('/unauthorized')
    }
    return res
}

export const requireRole = async (role: string) => {
    const session = await getSession()
    if (!session) {
        redirect('/sign-in')
    }
    if (session.user.role !== role) {
        redirect('/unauthorized')
    }
    return session
}
