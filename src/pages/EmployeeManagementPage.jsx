import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { db } from '../firebase/config'

function EmployeeManagementPage() {
  const [employees, setEmployees] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [salary, setSalary] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchEmployees = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'employees'))
      const employeeList = snapshot.docs
        .map((employeeDoc) => ({
          id: employeeDoc.id,
          ...employeeDoc.data(),
        }))
        .sort((a, b) => {
          const aTime = a.createdAt?.seconds || 0
          const bTime = b.createdAt?.seconds || 0
          return bTime - aTime
        })
      setEmployees(employeeList)
    } catch {
      setError('Unable to fetch employees.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const handleAddEmployee = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await addDoc(collection(db, 'employees'), {
        name: name.trim(),
        email: email.trim(),
        role: role.trim(),
        salary: Number(salary),
        createdAt: serverTimestamp(),
      })

      setName('')
      setEmail('')
      setRole('')
      setSalary('')
      fetchEmployees()
    } catch {
      setError('Unable to add employee. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await deleteDoc(doc(db, 'employees', employeeId))
      fetchEmployees()
    } catch {
      setError('Unable to delete employee. Please try again.')
    }
  }

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-800">Employee Management</h1>
          <p className="mt-2 text-sm text-slate-600">
            Add employees and manage records.
          </p>

          <form
            onSubmit={handleAddEmployee}
            className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-5"
          >
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
            />
            <input
              type="text"
              placeholder="Role"
              required
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
            />
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Salary"
              required
              value={salary}
              onChange={(event) => setSalary(event.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
            />
            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {submitting ? 'Saving...' : 'Add Employee'}
            </button>
          </form>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">Employees</h2>
          {loading ? (
            <p className="mt-3 text-slate-600">Loading employees...</p>
          ) : employees.length === 0 ? (
            <p className="mt-3 text-slate-600">No employees found.</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Email</th>
                    <th className="px-3 py-2">Role</th>
                    <th className="px-3 py-2">Salary</th>
                    <th className="px-3 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id} className="border-b border-slate-100">
                      <td className="px-3 py-2">{employee.name}</td>
                      <td className="px-3 py-2">{employee.email}</td>
                      <td className="px-3 py-2">{employee.role}</td>
                      <td className="px-3 py-2">${employee.salary}</td>
                      <td className="px-3 py-2">
                        <button
                          type="button"
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="rounded-md bg-red-600 px-3 py-1.5 text-white hover:bg-red-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default EmployeeManagementPage
