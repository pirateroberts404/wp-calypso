/** @format */

/**
 * External dependencies
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { includes } from 'lodash';

/**
 * Internal dependencies
 */

import { appStates } from 'state/imports/constants';
import Card from 'components/card';
import ImporterHeader from '../importer-header';
import ImportingPane from '../importing-pane';
import SiteImporterInputPane from './site-importer-input-pane';
import EmptyContent from 'components/empty-content';

/**
 * Module variables
 */
const compactStates = [ appStates.DISABLED, appStates.INACTIVE ];
const importingStates = [
	appStates.IMPORT_FAILURE,
	appStates.IMPORT_SUCCESS,
	appStates.IMPORTING,
	appStates.MAP_AUTHORS,
];
const uploadingStates = [
	appStates.READY_FOR_UPLOAD,
	appStates.UPLOAD_FAILURE,
	appStates.UPLOAD_SUCCESS,
	appStates.UPLOAD_PROCESSING,
	appStates.UPLOADING,
];

export const FromSignupPane = () => (
	<div>
		<EmptyContent
			illustration="/calypso/images/illustrations/illustration-ok.svg"
			title={ 'Congratulations!' }
			line={ 'Your password has been reset.' }
		/>
	</div>
);

export default class extends React.PureComponent {
	static displayName = 'SiteImporter';

	static propTypes = {
		importerData: PropTypes.shape( {
			title: PropTypes.string.isRequired,
			icon: PropTypes.string.isRequired,
			description: PropTypes.oneOfType( [ PropTypes.string, PropTypes.node ] ).isRequired,
			uploadDescription: PropTypes.oneOfType( [ PropTypes.string, PropTypes.node ] ),
		} ).isRequired,
		importerStatus: PropTypes.shape( {
			errorData: PropTypes.shape( {
				type: PropTypes.string.isRequired,
				description: PropTypes.string.isRequired,
			} ),
			filename: PropTypes.string,
			importerState: PropTypes.string.isRequired,
			percentComplete: PropTypes.number,
			siteTitle: PropTypes.string.isRequired,
			statusMessage: PropTypes.string,
		} ),
	};

	render() {
		const { title, icon, description, uploadDescription } = this.props.importerData;
		const site = this.props.site;
		const state = this.props.importerStatus;
		const isEnabled = appStates.DISABLED !== state.importerState;
		const cardClasses = classNames( 'importer__shell', {
			'is-compact': includes( compactStates, state.importerState ),
			'is-disabled': ! isEnabled,
		} );

		if ( state.importerState === 'from-signup' ) {
			console.log( 'from-signup' );
		}

		return (
			<Card className={ cardClasses }>
				<ImporterHeader
					importerStatus={ state }
					{ ...{ icon, title, description, isEnabled, site } }
				/>
				{ state.importerState === 'from-signup' && <FromSignupPane engine={ state.engine } /> }
				{ includes( importingStates, state.importerState ) && (
					<ImportingPane
						{ ...this.props }
						importerStatus={ state }
						sourceType={ title }
						site={ this.props.site }
					/>
				) }
				{ includes( uploadingStates, state.importerState ) && (
					<SiteImporterInputPane
						{ ...this.props }
						description={ uploadDescription }
						importerStatus={ state }
						onStartImport={ this.validateSite }
						isEnabled={ isEnabled }
					/>
				) }
			</Card>
		);
	}
}
