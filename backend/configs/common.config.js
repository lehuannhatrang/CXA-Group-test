export const CommonConfig = {
    SECRET: process.env.JWT_SECRET || "G/aw\"c5TQ{FVRrBL5Bdt6UcF?aJ9t~UrC/^GQ_!k",
    MAX_AGE_SESSION: process.env.JWT_MAX_AGE_SESSION || '24h',
    EXTERNAL_TOKEN: process.env.EXTERNAL_TOKEN || 'T6N%U?gAnVnFhF.z`]S(cy@9YU5`h:M93T^4B]iZ'
}