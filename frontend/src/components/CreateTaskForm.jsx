import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import AddButton from './AddButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

const CreateTaskForm = forwardRef(({ onSubmit, onUpdate, editingTask }, ref) => {
  const modalRef = useRef(null);
  const modalInstanceRef = useRef(null);

  useImperativeHandle(ref, () => ({
    openModal: () => {
      const modal = new window.bootstrap.Modal(modalRef.current);
      modalInstanceRef.current = modal;
      modal.show();
    },
  }));

  // State for form fields
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [assignee, setAssignee] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Pre-fill form when editingTask changes
  useEffect(() => {
    if (editingTask) {
      setEditingId(editingTask.id);
      setTaskTitle(editingTask.title || '');
      setTaskDate(editingTask.dueDate || '');
      setDescription(editingTask.description || '');
      setPriority(editingTask.priority || '');
      setStatus(editingTask.status || '');
      setAssignee(editingTask.assignee || '');
    } else {
      setEditingId(null);
      setTaskTitle('');
      setTaskDate('');
      setDescription('');
      setPriority('');
      setStatus('');
      setAssignee('');
    }
  }, [editingTask]);

  useImperativeHandle(ref, () => ({
    openModal: () => {
      const modal = new window.bootstrap.Modal(modalRef.current);
      modalInstanceRef.current = modal;
      modal.show();
    },
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      id: editingId || Date.now(),
      title: taskTitle,
      dueDate: taskDate,
      description,
      priority,
      status,
      assignee,
    };
    if (editingId) {
      onUpdate && onUpdate(taskData);
    } else {
      onSubmit && onSubmit(taskData);
    }
    modalInstanceRef.current.hide();
    // Reset form fields
    setEditingId(null);
    setTaskTitle('');
    setTaskDate('');
    setDescription('');
    setPriority('');
    setStatus('');
    setAssignee('');
  };

  return (
    <>
      {/* <AddButton label="Add Task" onClick={() => ref.current?.openModal()} /> */}

      <div className="modal fade" ref={modalRef} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Create New Task</h5>
                <button type="button" className="btn-close btn-close-dark" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body bg-light">
                <div className="card p-4 border-0 shadow-sm">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label">Task Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Design login screen"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Due Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={taskDate}
                        onChange={(e) => setTaskDate(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Add details about this task..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Priority</label>
                      <select
                        className="form-select"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        required
                      >
                        <option value="">Select</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Urgent</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                      >
                        <option value="">Select</option>
                        <option>Open</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                        <option>On Hold</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Assignee</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Team member name"
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer bg-white">
                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  <FontAwesomeIcon icon={editingId ? faEdit : faPlus} className="me-2" />
                  {editingId ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
});

export default CreateTaskForm;
