import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createBudget, getBudgetById, updateBudget } from '../services/api'

const getInitialForm = () => {
  const now = new Date()
  return {
    category: '',
    amount: '',
    spent: 0,
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    rolloverType: 'full',
    notes: '',
  }
}

const BudgetForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(getInitialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isEdit = Boolean(id)

  useEffect(() => {
    if (!isEdit) return

    const loadBudget = async () => {
      setLoading(true)
      try {
        const data = await getBudgetById(id)
        setForm({
          category: data.category,
          amount: data.amount,
          spent: data.spent,
          month: data.month,
          year: data.year,
          rolloverType: data.rolloverType,
          notes: data.notes || '',
        })
      } catch (err) {
        setError(err.message || 'Failed to load budget')
      } finally {
        setLoading(false)
      }
    }

    loadBudget()
  }, [id, isEdit])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      ...form,
      amount: Number(form.amount),
      spent: Number(form.spent),
      month: Number(form.month),
      year: Number(form.year),
    }

    try {
      if (isEdit) {
        await updateBudget(id, payload)
      } else {
        await createBudget(payload)
      }
      navigate('/budgets')
    } catch (err) {
      setError(err.message || 'Failed to save budget')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="container py-4">
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <h1 className="fw-bold mb-2">{isEdit ? 'Edit Budget' : 'New Budget'}</h1>
          <p className="text-muted mb-4">All fields help demonstrate validation and CRUD workflows for CSIS 3380.</p>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Category</label>
                <input 
                  name="category" 
                  className="form-control" 
                  value={form.category} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. Groceries" 
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Amount</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input 
                    name="amount" 
                    type="number" 
                    step="0.01" 
                    className="form-control" 
                    value={form.amount} 
                    onChange={handleChange} 
                    required 
                    min="0" 
                  />
                </div>
              </div>

              <div className="col-md-4">
                <label className="form-label">Spent To Date</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input 
                    name="spent" 
                    type="number" 
                    step="0.01" 
                    className="form-control" 
                    value={form.spent} 
                    onChange={handleChange} 
                    required 
                    min="0" 
                  />
                </div>
              </div>

              <div className="col-md-4">
                <label className="form-label">Month</label>
                <select name="month" className="form-select" value={form.month} onChange={handleChange}>
                  {Array.from({ length: 12 }).map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Year</label>
                <input 
                  name="year" 
                  type="number" 
                  className="form-control" 
                  value={form.year} 
                  onChange={handleChange} 
                  min="2020" 
                  max="2100" 
                />
              </div>

              <div className="col-12">
                <label className="form-label">Rollover Type</label>
                <select name="rolloverType" className="form-select" value={form.rolloverType} onChange={handleChange}>
                  <option value="full">Full</option>
                  <option value="partial">Partial</option>
                  <option value="none">None</option>
                  <option value="goal">Goal</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label">Notes</label>
                <textarea 
                  name="notes" 
                  rows="3" 
                  className="form-control" 
                  value={form.notes} 
                  onChange={handleChange} 
                  placeholder="Optional context for instructors" 
                />
              </div>

              <div className="col-12">
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Saving...
                      </>
                    ) : (
                      isEdit ? 'Update Budget' : 'Create Budget'
                    )}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => navigate('/budgets')}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default BudgetForm
