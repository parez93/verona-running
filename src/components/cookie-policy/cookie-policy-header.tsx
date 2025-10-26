import React from 'react';
import {getTranslations} from "next-intl/server";

const CookiePolicyHeader = async () => {
    const t = await getTranslations("cookiePolicy");

    return (
        <div className="pb-[25px]">
            <div>
                <h1 className="text-[19px] text-[#262626] mb-[5px]">
                    {t("cookiePolicyHeader.title")}
                </h1>
                <div className="text-sm">
                    <p className="mb-4">
                        {t("cookiePolicyHeader.paragraphs.p1")}
                    </p>
                    <p className="mb-4">
                        {t("cookiePolicyHeader.paragraphs.p2")}
                        <br/>
                        {t("cookiePolicyHeader.paragraphs.p3")}
                    </p>
                    <p className="mb-4">
                        {t("cookiePolicyHeader.paragraphs.p4")}
                    </p>
                    <p>
                        {t("cookiePolicyHeader.paragraphs.p5")}
                        <br/>
                        {t("cookiePolicyHeader.paragraphs.p6")}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicyHeader;
