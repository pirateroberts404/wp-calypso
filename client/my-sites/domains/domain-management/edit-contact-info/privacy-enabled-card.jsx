/** @format */

/**
 * External dependencies
 */
import React from 'react';
import { useTranslate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import { CALYPSO_CONTACT } from 'lib/url/support';

/**
 * Style dependencies
 */
import './privacy-enabled-card.scss';

export default function EditContactInfoPrivacyEnabledCard() {
	const translate = useTranslate();

	return (
		<Card className="edit-contact-info__privacy-enabled-card">
			<p className="edit-contact-info__privacy-enabled-card-settings-explanation">
				{ translate(
					'This domain is currently using Privacy Protection to keep your information from showing up in public record searches. ' +
						"If you need to make a change to your domain's contact info, please {{a}}contact support{{/a}}.",
					{
						components: {
							a: <a href={ CALYPSO_CONTACT } target="_blank" rel="noopener noreferrer" />,
						},
					}
				) }
			</p>
		</Card>
	);
}
