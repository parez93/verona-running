import React from 'react';
import {getTranslations} from "next-intl/server";

const DataControllerInfo = async () => {
    const t = await getTranslations("cookiePolicy");

    return (
        <section>
            <h3 className="text-[13px] text-[#262626] font-bold mb-2">
                {t("dataControllerInfo.title")}
            </h3>
            <p className="mb-4 text-sm leading-normal text-foreground">
                {t("dataControllerInfo.paragraphs.p1")}
                <br />
                <i>{t("dataControllerInfo.paragraphs.p2")}</i>
                <br />
                {t("dataControllerInfo.paragraphs.p3")}
                <br />
                {t("dataControllerInfo.paragraphs.p4")}
            </p>
            <p className="mb-4 text-sm leading-normal text-foreground">
                <strong className="font-bold">{t("dataControllerInfo.paragraphs.p5")}</strong>{' '}
                <a href="mailto:veronarunning@gmail.com" className="text-link underline">
                    {t("dataControllerInfo.paragraphs.p6")}
                </a>
            </p>
            <p className="mb-4 text-sm leading-normal text-foreground">
                {t("dataControllerInfo.paragraphs.p7")}
            </p>
        </section>
    );
};

export default DataControllerInfo;
