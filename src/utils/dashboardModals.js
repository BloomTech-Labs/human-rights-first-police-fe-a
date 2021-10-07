import { Modal } from "antd";
import { ExclamationCircleOutlined, InfoCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";

/**
 *
 * @param {ModalFuncProps} opts
 * @returns {Promise<boolean>}
 */
export function showConfirmModal(opts) {
	return new Promise((resolve, reject) => {
		/** @type {import("antd").ModalFuncProps} */
		const modalOpts = {
			icon: <QuestionCircleOutlined />,
			maskClosable: true,
			mask: true,
			onOk: () => resolve(true),
			onCancel: () => resolve(false),
			...opts
		};

		Modal.confirm(modalOpts);
	});
}

/**
 *
 * @param {ModalFuncProps} opts
 * @returns {Promise<boolean>}
 */
export function showInfoModal(opts) {
	return new Promise((resolve, reject) => {
		const modalOpts = {
			maskClosable: true,
			mask: true,
			icon: <InfoCircleOutlined />,
			onOk: () => resolve(true),
			onCancel: () => resolve(false),
			...opts
		};

		Modal.info(modalOpts);
	});
}

function confirmChangeStatus(selected, status) {
	const verb = { 'rejected': 'reject', 'pending': 'disapprove', 'approved': 'approve' }[status];
	const title = 'Change Status';
	const content = `Are you sure you want to ${verb} ${selected} incident${selected > 1 ? 's' : ''}?`;
	return showConfirmModal({ title, content });
}

function confirmDeleteIncident(incident_id) {
	const title = 'Delete Incident';
	const content = `Are you sure you want to delete incident #${incident_id}?`;
	const icon = <ExclamationCircleOutlined />;
	return showConfirmModal({ title, content, icon });
}

function locationRequired() {
	const title = 'Location Required';
	const content = 'Incidents must have city/state to be approved.';
	return showInfoModal({ title, content });
}

export const dashboardModals = { confirmChangeStatus, locationRequired, confirmDeleteIncident };
