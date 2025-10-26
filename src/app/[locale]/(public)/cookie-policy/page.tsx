import CookiePolicyHeader from '@/components/cookie-policy/cookie-policy-header';
import TrackingToolsUsage from '@/components/cookie-policy/tracking-tools-usage';
import PreferenceManagement from '@/components/cookie-policy/preference-management';
import DataControllerInfo from '@/components/cookie-policy/data-controller-info';
import DefinitionsLegalReferences from '@/components/cookie-policy/definitions-legal-references';
import LegalReferencesFooter from '@/components/cookie-policy/legal-references-footer';

export default function CookiePolicyPage() {
    return (
        <div className="bg-white font-sans text-foreground">
            <div className="p-2">
                <div className="max-w-[1263px] mx-auto my-[30px] rounded-[3px] text-[#595858] text-[13px]">
                    <div className="px-[30px] py-[25px]">
                        <div className="pb-[25px]">
                            <CookiePolicyHeader/>
                            <TrackingToolsUsage/>
                            <PreferenceManagement/>
                            <DataControllerInfo/>
                            <DefinitionsLegalReferences/>
                            <LegalReferencesFooter/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
