import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

const CreateTaskForm = forwardRef(({ onSubmit, onUpdate, onEdit }, ref) => {
  const modalRef = useRef(null);
  const modalInstanceRef = useRef(null);

  // Form state
  const [editingId, setEditingId] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [assignee, setAssignee] = useState('');

  const PRIORITY_OPTIONS = [
    { name: 'Low', value: 'Low' },
    { name: 'Medium', value: 'Medium' },
    { name: 'High', value: 'High' },
    { name: 'Urgent', value: 'Urgent' }
  ];

  const STATUS_OPTIONS = [
    { name: 'Open', value: 'Open' },
    { name: 'In Progress', value: 'In Progress' },
    { name: 'On Hold', value: 'On Hold' },
    { name: 'Cancelled', value: 'Cancelled' }
  ];
  // Dropdown data
  const [priorities] = useState(PRIORITY_OPTIONS);
  const [statuses] = useState(STATUS_OPTIONS);
  const [users, setUsers] = useState([]);
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);


  useEffect(() => {
    setDropdownsLoaded(true);
  }, []);
  //  Load dropdowns from backend
  // useEffect(() => {
  //   fetch("http://localhost/taskly/taskly/backend/getOptions.php")
  //     .then(res => res.json())
  //     .then(data => {
  //       setPriorities(data.priorities || []);
  //       setStatuses(data.statuses || []);
  //       setUsers(data.users || []);
  //       setDropdownsLoaded(true); // ✅ set flag
  //     })
  //     .catch(err => console.error("Failed to load dropdowns", err));
  // }, []);

  //  Open modal and populate task if provided
  useImperativeHandle(ref, () => ({
    openModal: (task = null) => {
      const modal = new window.bootstrap.Modal(modalRef.current);
      modalInstanceRef.current = modal;

      if (task) {
        // Wait until dropdowns are loaded before setting task values
        const waitAndSetForm = () => {
          if (dropdownsLoaded) {
            setEditingId(task.id || null);
            setTaskTitle(task.title || '');
            setStartDate(
              task.startDate
                ? task.startDate.substring(0, 10)
                : task.start_date
                  ? task.start_date.substring(0, 10)
                  : ''
            );
            setTaskDate(
              task.dueDate
                ? task.dueDate.substring(0, 10)
                : task.due_date
                  ? task.due_date.substring(0, 10)
                  : ''
            );
            setDescription(task.description || '');
            setPriority(task.priority || '');
            setStatus(task.status || '');
            setAssignee(task.assignee || '');

            modal.show();
          } else {
            setTimeout(waitAndSetForm, 100); // Retry after short delay
          }
        };
        waitAndSetForm();
      } else {
        // Reset form for new task
        setEditingId(null);
        setTaskTitle('');
        setStartDate('');
        setTaskDate('');
        setDescription('');
        setPriority('');
        setStatus('');
        setAssignee('');
        modal.show();
      }
    }

  }));

  //  Form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      id: editingId || Date.now(),
      title: taskTitle,
      startDate: startDate,
      dueDate: taskDate,
      description,
      // priority: Number(priority),
      // status: Number(status),
      // assignee: Number(assignee)
      priority: priority,
      status: status,
      assignee: assignee
    };

    if (editingId) {
      onUpdate && onUpdate(taskData);
    } else {
      onSubmit && onSubmit(taskData);
    }

    modalInstanceRef.current.hide();

    // Clear form
    setEditingId(null);
    setTaskTitle('');
    setStartDate('');
    setTaskDate('');
    setDescription('');
    setPriority('');
    setStatus('');
    setAssignee('');
  };

  return (
    <div className="modal fade" ref={modalRef} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content border-0 shadow rounded-4">
          <form onSubmit={handleSubmit}>
            <div className="modal-header bg-white border-0 rounded-top-4 px-4 py-3">
              <h5 className="modal-title fw-semibold">
                {editingId ? 'Update Task' : 'Create New Task'}
              </h5>
              <button type="button" className="btn-close btn-close-dark" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body bg-light px-4 pt-4 pb-2">
              <div className="bg-white p-4 rounded-4 shadow-sm">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Task Title</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      placeholder="e.g. Design login screen"
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-medium">Start Date</label>
                    <input
                      type="date"
                      className="form-control rounded-3"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-medium">Due Date</label>
                    <input
                      type="date"
                      className="form-control rounded-3"
                      value={taskDate}
                      onChange={(e) => setTaskDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-medium">Description</label>
                    <textarea
                      className="form-control rounded-3"
                      rows="3"
                      placeholder="Add details about this task..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-medium">Priority</label>
                    <select
                      className="form-select"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      {priorities.map(item => (
                        <option key={item.value} value={item.value}>{item.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-medium">Status</label>
                    <select
                      className="form-select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      {statuses.map(item => (
                        <option key={item.value} value={item.value}>{item.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* <div className="col-md-4">
                    <label className="form-label fw-medium">Assignee</label>
                    <select
                      className="form-select"
                      value={assignee}
                      onChange={(e) => setAssignee(e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      {users.map(user => (
                        <option key={user.name} value={user.name}>{user.name}</option>
                      ))}
                    </select>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="modal-footer bg-white border-0 rounded-bottom-4 px-4 py-3">
              <button type="button" className="btn btn-outline-secondary rounded-3" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="submit" className="btn btn-success rounded-3">
                <FontAwesomeIcon icon={editingId ? faEdit : faPlus} className="me-2" />
                {editingId ? 'Update Task' : 'Create Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default CreateTaskForm;
