declare global {
    interface CloudManager {
        hasTotHEntitlementAndIsEnabled: boolean;
        hasAoDEntitlementAndIsEnabled: boolean;
    }

    const cloudManager: CloudManager;
}

export {};