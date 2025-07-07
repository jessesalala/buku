import React, { useState } from 'react';
import { FaCalendarAlt, FaPenAlt, FaSignature, FaBookOpen } from 'react-icons/fa';
import './Workbook.css';

export default function Workbook() {
  const [formData, setFormData] = useState({
    // Section 1: Basic Information
    childName: '',
    birthDate: '',
    educationLevel: '',
    tanzaniteLevel: '',
    
    // Section 2: Child Goals
    childDream: '',
    longTermGoal: '',
    mediumTermGoal: '',
    yearlyGoal: '',
    
    // Section 3: Parent/Guardian Info
    parentName: '',
    parentPhone: '',
    address: '',
    
    // Section 4: Declaration
    childDeclaration: '',
    parentDeclaration: '',
    parentSignature: '',
    declarationDate: '',
    
    // Section 5: Weekly Plan
    weekPlan: {
      weekDates: { start: '', end: '' },
      weeklyGoals: '',
      methods: {
        saving: ['', '', ''],
        producing: ['', '', ''],
        investing: ['', '', '']
      },
      dailyTransactions: {
        Monday: { save: '', produce: '', invest: '' },
        Tuesday: { save: '', produce: '', invest: '' },
        Wednesday: { save: '', produce: '', invest: '' },
        Thursday: { save: '', produce: '', invest: '' },
        Friday: { save: '', produce: '', invest: '' },
        Saturday: { save: '', produce: '', invest: '' },
        Sunday: { save: '', produce: '', invest: '' }
      },
      parentComments: '',
      planSignature: '',
      planDate: ''
    },
    
    // Section 6: Weekly Evaluation
    weekEvaluation: {
      weekDates: { start: '', end: '' },
      totalSaved: '',
      totalInvested: '',
      investmentMethods: '',
      lessonsLearned: '',
      stepsTaken: '',
      challenges: '',
      improvements: '',
      parentFeedback: '',
      evaluationSignature: '',
      evaluationDate: ''
    }
  });

  // Handler functions (same as previous)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleDailyTransactionChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      weekPlan: {
        ...prev.weekPlan,
        dailyTransactions: {
          ...prev.weekPlan.dailyTransactions,
          [day]: { ...prev.weekPlan.dailyTransactions[day], [field]: value }
        }
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="workbook-container">
      <h5 className="workbook-title">
        <FaBookOpen className="icon" /> TAARIFA ZA MTOTO NA MZAZI / MLEZI
      </h5>
      
      <form onSubmit={handleSubmit}>
        {/* SECTION 1: BASIC INFORMATION */}
        <div className="form-section">
          <h4>1. Taarifa za Msingi</h4>
          <div className="responsive-grid">
            <div className="form-group">
              <label>Jina La Mtoto:</label>
              <input
                type="text"
                name="childName"
                value={formData.childName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Tarehe ya Kuzaliwa:</label>
              <div className="date-input">
                
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Ngazi ya Elimu ya Sasa:</label>
              <input
                type="text"
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Ngazi ya Tanzanite Skills Academy:</label>
              <input
                type="text"
                name="tanzaniteLevel"
                value={formData.tanzaniteLevel}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: CHILD GOALS */}
        <div className="form-section">
          <h4>2. Malengo ya Mtoto</h4>
          <div className="form-group">
            <label>Ndoto kubwa za Mtoto (Nikiwa mkubwa nataka kuwa):</label>
            <textarea
              name="childDream"
              value={formData.childDream}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Malengo ya muda mrefu (Miaka 50 ijayo najiona):</label>
            <textarea
              name="longTermGoal"
              value={formData.longTermGoal}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Malengo ya muda wa kati (Miaka 10 ijayo najiona):</label>
            <textarea
              name="mediumTermGoal"
              value={formData.mediumTermGoal}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Malengo ya mwaka:</label>
            <textarea
              name="yearlyGoal"
              value={formData.yearlyGoal}
              onChange={handleChange}
              rows="3"
            />
          </div>
        </div>

        {/* SECTION 3: PARENT/GUARDIAN INFO */}
        <div className="form-section">
          <h4>3. Taarifa za Mzazi/Mlezi</h4>
          <div className="responsive-grid">
            <div className="form-group">
              <label>Jina la Mzazi/Mlezi:</label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Namba ya Simu:</label>
              <input
                type="tel"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Makazi ya mtoto na mzazi/mlezi:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: DECLARATION */}
        <div className="form-section declaration-section">
          <h4>4. Tamko la kushiriki programu</h4>
          <div className="declaration-text">
            <p>
              Mtoto: Mimi <span className="signature-field">
                <input
                  type="text"
                  name="childDeclaration"
                  value={formData.childDeclaration}
                  onChange={handleChange}
                />
              </span> nimechagua kushiriki programu ya NGUVU YA BUKU TOTO na nitatekeleza mafunzo kwa vitendo ili kujenga utajiri wa vizazi.
            </p>
            
            <p>
              Mzazi: Mimi <span className="signature-field">
                <input
                  type="text"
                  name="parentDeclaration"
                  value={formData.parentDeclaration}
                  onChange={handleChange}
                />
              </span> nimemruhusu mtoto wangu <span className="child-name">
                {formData.childName || "___________________"}
              </span> kushiriki programu ya NGUVU YA BUKU TOTO na nitashirikiana naye kikamilifu kutekeleza mafunzo kwa vitendo ili kujenga utajiri wa vizazi.
            </p>
          </div>

          <div className="signature-line">
            <span>Sahihi ya mzazi: <FaPenAlt /></span>
            <input
              type="text"
              name="parentSignature"
              value={formData.parentSignature}
              onChange={handleChange}
              className="signature-input"
            />
            <span className="date-field">Tarehe: 
              <input
                type="date"
                name="declarationDate"
                value={formData.declarationDate}
                onChange={handleChange}
              />
            </span>
          </div>
        </div>

        {/* SECTION 5: WEEKLY PLAN */}
        <div className="form-section">
          <h4>5. MPANGO WA WIKI</h4>
          
          <div className="responsive-grid">
            <div className="form-group">
              <label>Wiki ya tarehe:</label>
              <div className="date-range">
                <input
                  type="date"
                  value={formData.weekPlan.weekDates.start}
                  onChange={(e) => handleNestedChange('weekPlan', 'weekDates', {
                    ...formData.weekPlan.weekDates,
                    start: e.target.value
                  })}
                />
                <span>mpaka</span>
                <input
                  type="date"
                  value={formData.weekPlan.weekDates.end}
                  onChange={(e) => handleNestedChange('weekPlan', 'weekDates', {
                    ...formData.weekPlan.weekDates,
                    end: e.target.value
                  })}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Malengo ya wiki:</label>
            <textarea
              value={formData.weekPlan.weeklyGoals}
              onChange={(e) => handleNestedChange('weekPlan', 'weeklyGoals', e.target.value)}
              rows="3"
            />
          </div>

          <div className="form-group">
            <h3>Njia za nitakazofanyia kazi wiki hii:</h3>
            <div className="methods-grid">
              <div className="method-column">
                <h4>KUOKOA</h4>
                {[1, 2, 3].map((i) => (
                  <div key={`save-${i}`} className="method-item">
                    <span>{i}.</span>
                    <input
                      type="text"
                      value={formData.weekPlan.methods.saving[i-1] || ''}
                      onChange={(e) => {
                        const newMethods = [...formData.weekPlan.methods.saving];
                        newMethods[i-1] = e.target.value;
                        handleNestedChange('weekPlan', 'methods', {
                          ...formData.weekPlan.methods,
                          saving: newMethods
                        });
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="method-column">
                <h4>KUZALISHA</h4>
               {[1, 2, 3].map((i) => (
                  <div key={`save-${i}`} className="method-item">
                    <span>{i}.</span>
                    <input
                      type="text"
                      value={formData.weekPlan.methods.saving[i-1] || ''}
                      onChange={(e) => {
                        const newMethods = [...formData.weekPlan.methods.saving];
                        newMethods[i-1] = e.target.value;
                        handleNestedChange('weekPlan', 'methods', {
                          ...formData.weekPlan.methods,
                          saving: newMethods
                        });
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="method-column">
                <h4>KUWEKEZA</h4>
                {[1, 2, 3].map((i) => (
                  <div key={`save-${i}`} className="method-item">
                    <span>{i}.</span>
                    <input
                      type="text"
                      value={formData.weekPlan.methods.saving[i-1] || ''}
                      onChange={(e) => {
                        const newMethods = [...formData.weekPlan.methods.saving];
                        newMethods[i-1] = e.target.value;
                        handleNestedChange('weekPlan', 'methods', {
                          ...formData.weekPlan.methods,
                          saving: newMethods
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* WEEKLY TRANSACTION TABLE */}
          <div className="form-group">
            <h3>Utekelezaji wa mpango wa wiki, kwa kiasi cha fedha:</h3>
            <div className="table-wrapper">
              <table className="weekly-table">
  <thead>
    <tr>
      <th>Kipengele</th>
      <th>Bei (TZS)</th>
      <th>Siku</th>
    </tr>
  </thead>
  <tbody>
    {/* Kuokoa Row */}
    <tr>
      <td>Kuokoa</td>
      <td>
        <input
          type="number"
          value={formData.weekPlan.dailyTransactions.Kuokoa?.amount || ''}
          onChange={(e) => {
            setFormData(prev => ({
              ...prev,
              weekPlan: {
                ...prev.weekPlan,
                dailyTransactions: {
                  ...prev.weekPlan.dailyTransactions,
                  Kuokoa: {
                    ...prev.weekPlan.dailyTransactions.Kuokoa,
                    amount: e.target.value
                  }
                }
              }
            }));
          }}
        />
      </td>
      <td>
        <select
          value={formData.weekPlan.dailyTransactions.Kuokoa?.day || ''}
          onChange={(e) => {
            setFormData(prev => ({
              ...prev,
              weekPlan: {
                ...prev.weekPlan,
                dailyTransactions: {
                  ...prev.weekPlan.dailyTransactions,
                  Kuokoa: {
                    ...prev.weekPlan.dailyTransactions.Kuokoa,
                    day: e.target.value
                  }
                }
              }
            }));
          }}
        >
          <option value="">Chagua Siku</option>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </td>
    </tr>

    {/* Kuzalisha Row */}
    <tr>
      <td>Kuzalisha</td>
      <td>
        <input
          type="number"
          value={formData.weekPlan.dailyTransactions.Kuzalisha?.amount || ''}
          onChange={(e) => {
            setFormData(prev => ({
              ...prev,
              weekPlan: {
                ...prev.weekPlan,
                dailyTransactions: {
                  ...prev.weekPlan.dailyTransactions,
                  Kuzalisha: {
                    ...prev.weekPlan.dailyTransactions.Kuzalisha,
                    amount: e.target.value
                  }
                }
              }
            }));
          }}
        />
      </td>
      <td>
        <select
          value={formData.weekPlan.dailyTransactions.Kuzalisha?.day || ''}
          onChange={(e) => {
            setFormData(prev => ({
              ...prev,
              weekPlan: {
                ...prev.weekPlan,
                dailyTransactions: {
                  ...prev.weekPlan.dailyTransactions,
                  Kuzalisha: {
                    ...prev.weekPlan.dailyTransactions.Kuzalisha,
                    day: e.target.value
                  }
                }
              }
            }));
          }}
        >
          <option value="">Chagua Siku</option>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </td>
    </tr>

    {/* Kuwekeza Row */}
    <tr>
      <td>Kuwekeza</td>
      <td>
        <input
          type="number"
          value={formData.weekPlan.dailyTransactions.Kuwekeza?.amount || ''}
          onChange={(e) => {
            setFormData(prev => ({
              ...prev,
              weekPlan: {
                ...prev.weekPlan,
                dailyTransactions: {
                  ...prev.weekPlan.dailyTransactions,
                  Kuwekeza: {
                    ...prev.weekPlan.dailyTransactions.Kuwekeza,
                    amount: e.target.value
                  }
                }
              }
            }));
          }}
        />
      </td>
      <td>
        <select
          value={formData.weekPlan.dailyTransactions.Kuwekeza?.day || ''}
          onChange={(e) => {
            setFormData(prev => ({
              ...prev,
              weekPlan: {
                ...prev.weekPlan,
                dailyTransactions: {
                  ...prev.weekPlan.dailyTransactions,
                  Kuwekeza: {
                    ...prev.weekPlan.dailyTransactions.Kuwekeza,
                    day: e.target.value
                  }
                }
              }
            }));
          }}
        >
          <option value="">Chagua Siku</option>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </td>
    </tr>
  </tbody>
</table>

            </div>
          </div>

          <div className="form-group">
            <label>Maoni ya Mzazi/Mlezi kuhusu mpango wa wiki:</label>
            <textarea
              value={formData.weekPlan.parentComments}
              onChange={(e) => handleNestedChange('weekPlan', 'parentComments', e.target.value)}
              rows="3"
            />
          </div>

          <div className="signature-line">
            <span>Sahihi ya Mzazi/Mlezi: <FaSignature /></span>
            <input
              type="text"
              name="planSignature"
              value={formData.weekPlan.planSignature}
              onChange={(e) => handleNestedChange('weekPlan', 'planSignature', e.target.value)}
              className="signature-input"
            />
            <span className="date-field">Tarehe: 
              <input
                type="date"
                name="planDate"
                value={formData.weekPlan.planDate}
                onChange={(e) => handleNestedChange('weekPlan', 'planDate', e.target.value)}
              />
            </span>
          </div>
        </div>

        {/* SECTION 6: WEEKLY EVALUATION */}
        <div className="form-section">
          <h2>6. TATHMINI YA WIKI</h2>
          
          <div className="responsive-grid">
            <div className="form-group">
              <label>Wiki ya tarehe:</label>
              <div className="date-range">
                <input
                  type="date"
                  value={formData.weekEvaluation.weekDates.start}
                  onChange={(e) => handleNestedChange('weekEvaluation', 'weekDates', {
                    ...formData.weekEvaluation.weekDates,
                    start: e.target.value
                  })}
                />
                <span>mpaka</span>
                <input
                  type="date"
                  value={formData.weekEvaluation.weekDates.end}
                  onChange={(e) => handleNestedChange('weekEvaluation', 'weekDates', {
                    ...formData.weekEvaluation.weekDates,
                    end: e.target.value
                  })}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Jumla ya fedha zilizopatikana kwa kuokoa na kuzalisha:</label>
            <input
              type="text"
              value={formData.weekEvaluation.totalSaved}
              onChange={(e) => handleNestedChange('weekEvaluation', 'totalSaved', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Jumla ya fedha zilizowekezwa:</label>
            <input
              type="text"
              value={formData.weekEvaluation.totalInvested}
              onChange={(e) => handleNestedChange('weekEvaluation', 'totalInvested', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Njia ambazo uwekezaji umefanyika:</label>
            <input
              type="text"
              value={formData.weekEvaluation.investmentMethods}
              onChange={(e) => handleNestedChange('weekEvaluation', 'investmentMethods', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Niliyojifunza kwenye programu wiki hii:</label>
            <textarea
              value={formData.weekEvaluation.lessonsLearned}
              onChange={(e) => handleNestedChange('weekEvaluation', 'lessonsLearned', e.target.value)}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Niliyojifunza kwenye hatua nilizochukua:</label>
            <textarea
              value={formData.weekEvaluation.stepsTaken}
              onChange={(e) => handleNestedChange('weekEvaluation', 'stepsTaken', e.target.value)}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Changamoto nilizokutana nazo:</label>
            <textarea
              value={formData.weekEvaluation.challenges}
              onChange={(e) => handleNestedChange('weekEvaluation', 'challenges', e.target.value)}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Namna nitakavyoboresha wiki ijayo:</label>
            <textarea
              value={formData.weekEvaluation.improvements}
              onChange={(e) => handleNestedChange('weekEvaluation', 'improvements', e.target.value)}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Maoni ya Mzazi/Mlezi kuhusu maendeleo:</label>
            <textarea
              value={formData.weekEvaluation.parentFeedback}
              onChange={(e) => handleNestedChange('weekEvaluation', 'parentFeedback', e.target.value)}
              rows="3"
            />
          </div>

          <div className="signature-line">
            <span>Sahihi ya Mzazi/Mlezi: <FaSignature /></span>
            <input
              type="text"
              name="evaluationSignature"
              value={formData.weekEvaluation.evaluationSignature}
              onChange={(e) => handleNestedChange('weekEvaluation', 'evaluationSignature', e.target.value)}
              className="signature-input"
            />
            <span className="date-field">Tarehe: 
              <input
                type="date"
                name="evaluationDate"
                value={formData.weekEvaluation.evaluationDate}
                onChange={(e) => handleNestedChange('weekEvaluation', 'evaluationDate', e.target.value)}
              />
            </span>
          </div>
        </div>
        <button type="submit" className="submit-button">Hifadhi Taarifa</button>
      </form>
    </div>
  );
}