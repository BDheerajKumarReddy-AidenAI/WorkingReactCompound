import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Button, 
    Checkbox, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    FormControl, 
    FormControlLabel, 
    FormHelperText, 
    Grid, 
    InputLabel, 
    MenuItem, 
    Select, 
    TextField, 
    Typography 
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';

const CompoundRequestForm = () => {
    const [formState, setFormState] = useState({
        requesterName: '',
        department: '',
        email: '',
        supervisorName: '',
        requestDate: new Date(),
        compoundName: '',
        smilesString: '',
        inchiString: '',
        molecularStructure: null,
        casNumber: '',
        molecularWeight: 0,
        targetPathway: '',
        proposedUse: '',
        controlledSubstance: false,
        relatedCompoundIds: '',
        priorityLevel: '',
        justification: '',
        requestedQuantity: 0,
        purityRequirement: 0,
        timelineRequired: new Date(),
        ipSensitive: false,
        externalDisclosureRisk: false,
        disclosureCommentText: '',
        supportingProtocol: [],
        references: '',
        analogueCompounds: null,
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!formState.department) newErrors.department = 'Department is required';
        if (!formState.supervisorName) newErrors.supervisorName = 'Supervisor Name is required';
        if (!formState.compoundName || !/^[A-Za-z0-9\s\-_]+$/.test(formState.compoundName) || formState.compoundName.length > 100) 
            newErrors.compoundName = 'Invalid Compound Name';
        if (!formState.smilesString) newErrors.smilesString = 'SMILES String is required';
        if (!formState.inchiString) newErrors.inchiString = 'InChI String is required';
        if (!formState.casNumber || !/^\d{1,7}-\d{2}-\d$/.test(formState.casNumber)) 
            newErrors.casNumber = 'Invalid CAS Number';
        if (!formState.targetPathway) newErrors.targetPathway = 'Target Pathway is required';
        if (!formState.proposedUse || formState.proposedUse.length < 20) 
            newErrors.proposedUse = 'Proposed Use must be at least 20 characters';
        if (!formState.priorityLevel) newErrors.priorityLevel = 'Priority Level is required';
        if (!formState.requestedQuantity || formState.requestedQuantity < 1 || formState.requestedQuantity > 500) 
            newErrors.requestedQuantity = 'Invalid Requested Quantity';
        if (!formState.purityRequirement || formState.purityRequirement < 90 || formState.purityRequirement > 100) 
            newErrors.purityRequirement = 'Invalid Purity Requirement';
        if (!formState.timelineRequired) newErrors.timelineRequired = 'Timeline Required is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (name, date) => {
        setFormState(prevState => ({
            ...prevState,
            [name]: date
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: files
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleSubmitRequest = () => {
        if (validate()) {
            // Handle form submission logic here
            console.log('Form submitted:', formState);
            navigate('/success'); // Redirect to success page or handle as needed
        }
    };

    const onSaveDraft = () => {
        // Handle save draft logic here
        console.log('Draft saved:', formState);
    };

    const onPreview = () => {
        // Handle preview logic here
        console.log('Preview:', formState);
    };

    const onPriorityChange = (e) => {
        const { value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            priorityLevel: value,
            justification: value === 'High' ? '' : prevState.justification
        }));
    };

    const onDisclosureRiskChange = (e) => {
        const { checked } = e.target;
        setFormState(prevState => ({
            ...prevState,
            externalDisclosureRisk: checked,
            disclosureCommentText: checked ? '' : prevState.disclosureCommentText
        }));
    };

    return (
        <Box className="compound-request-form" sx={{ padding: 2.4, width: 850, overflowY: 'auto' }}>
            <Typography variant="h6" gutterBottom>Compound Synthesis Request</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box className="fieldset" sx={{ marginBottom: 2.4 }}>
                        <Typography variant="subtitle1" gutterBottom>Section 1: Requestor Information</Typography>
                        <TextField
                            label="Requester Name"
                            name="requesterName"
                            value={formState.requesterName}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                            InputProps={{ readOnly: true }}
                        />
                        <FormControl fullWidth margin="dense" error={!!errors.department}>
                            <InputLabel>Department</InputLabel>
                            <Select
                                label="Department"
                                name="department"
                                value={formState.department}
                                onChange={handleChange}
                            >
                                <MenuItem value="Medicinal Chemistry">Medicinal Chemistry</MenuItem>
                                <MenuItem value="Discovery Biology">Discovery Biology</MenuItem>
                                <MenuItem value="Pharmacology">Pharmacology</MenuItem>
                                <MenuItem value="Toxicology">Toxicology</MenuItem>
                            </Select>
                            {errors.department && <FormHelperText>{errors.department}</FormHelperText>}
                        </FormControl>
                        <TextField
                            label="Email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                            InputProps={{ readOnly: true }}
                        />
                        <TextField
                            label="Supervisor Name"
                            name="supervisorName"
                            value={formState.supervisorName}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                            error={!!errors.supervisorName}
                            helperText={errors.supervisorName}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date of Request"
                                name="requestDate"
                                value={formState.requestDate}
                                onChange={(date) => handleDateChange('requestDate', date)}
                                renderInput={(params) => <TextField {...params} fullWidth margin="dense" InputProps={{ readOnly: true }} />}
                            />
                        </LocalizationProvider>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box className="fieldset" sx={{ marginBottom: 2.4 }}>
                        <Typography variant="subtitle1" gutterBottom>Section 2: Compound Information</Typography>
                        <TextField
                            label="Compound Name"
                            name="compoundName"
                            value={formState.compoundName}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                            error={!!errors.compoundName}
                            helperText={errors.compoundName}
                            inputProps={{ maxLength: 100 }}
                        />
                        <TextField
                            label="SMILES String"
                            name="smilesString"
                            value={formState.smilesString}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                            error={!!errors.smilesString}
                            helperText={errors.smilesString}
                            multiline
                            rows={4}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => console.log('Validate Structure')}
                            sx={{ marginBottom: 1.2 }}
                        >
                            Validate Structure
                        </Button>
                        <TextField
                            label="InChI String"
                            name="inchiString"
                            value={formState.inchiString}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                            error={!!errors.inchiString}
                            helperText={errors.inchiString}
                            multiline
                            rows={4}
                        />
                        <TextField
                            label="Molecular Structure"
                            name="molecularStructure"
                            type="file"
                            onChange={handleFileChange}
                            fullWidth
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ accept: '.mol,.sdf,.cdx,.png,.jpg' }}
                        />
                        <TextField
                            label="CAS Number"
                            name="casNumber"
                            value={formState.casNumber}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                            error={!!errors.casNumber}
                            helperText={errors.casNumber}
                        />
                        <TextField
                            label="Molecular Weight"
                            name="molecularWeight"
                            value={formState.molecularWeight}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                            InputProps={{ readOnly: true }}
                        />
                        <FormControl fullWidth margin="dense" error={!!errors.targetPathway}>
                            <InputLabel>Target Pathway</InputLabel>
                            <Select
                                label="Target Pathway"
                                name="targetPathway"
                                value={formState.targetPathway}
                                onChange={handleChange}
                            >
                                <MenuItem value="GPCR Signaling">GPCR Signaling</MenuItem>
                                <MenuItem value="Kinase Inhibition">Kinase Inhibition</MenuItem>
                                <MenuItem value="Protease Inhibition">Protease Inhibition</MenuItem>
                                <MenuItem value="Ion Channel Modulation">Ion Channel Modulation</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                            {errors.targetPathway && <FormHelperText>{errors.targetPathway}</FormHelperText>}
                        </FormControl>
                        <TextField
                            label="Proposed Use"
                            name="proposedUse"
                            value={formState.proposedUse}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                            error={!!errors.proposedUse}
                            helperText={errors.proposedUse}
                            multiline
                            rows={4}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={formState.controlledSubstance} onChange={handleCheckboxChange} name="controlledSubstance" />}
                            label="Is this a controlled substance?"
                        />
                        <TextField
                            label="Related Compound IDs"
                            name="relatedCompoundIds"
                            value={formState.relatedCompoundIds}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box className="fieldset" sx={{ marginBottom: 2.4 }}>
                        <Typography variant="subtitle1" gutterBottom>Section 3: Request Details</Typography>
                        <FormControl fullWidth margin="dense" error={!!errors.priorityLevel}>
                            <InputLabel>Priority Level</InputLabel>
                            <Select
                                label="Priority Level"
                                name="priorityLevel"
                                value={formState.priorityLevel}
                                onChange={onPriorityChange}
                            >
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </Select>
                            {errors.priorityLevel && <FormHelperText>{errors.priorityLevel}</FormHelperText>}
                        </FormControl>
                        <TextField
                            label="Priority Justification"
                            name="justification"
                            value={formState.justification}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                            multiline
                            rows={4}
                            hidden={formState.priorityLevel !== 'High'}
                        />
                        <TextField
                            label="Requested Quantity (mg)"
                            name="requestedQuantity"
                            type="number"
                            value={formState.requestedQuantity}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                            error={!!errors.requestedQuantity}
                            helperText={errors.requestedQuantity}
                            inputProps={{ min: 1, max: 500 }}
                        />
                        <TextField
                            label="Purity Requirement (%)"
                            name="purityRequirement"
                            type="number"
                            value={formState.purityRequirement}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                            error={!!errors.purityRequirement}
                            helperText={errors.purityRequirement}
                            inputProps={{ min: 90, max: 100 }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Timeline Required"
                                name="timelineRequired"
                                value={formState.timelineRequired}
                                onChange={(date) => handleDateChange('timelineRequired', date)}
                                renderInput={(params) => <TextField {...params} fullWidth margin="dense" error={!!errors.timelineRequired} helperText={errors.timelineRequired} />}
                            />
                        </LocalizationProvider>
                        <FormControlLabel
                            control={<Checkbox checked={formState.ipSensitive} onChange={handleCheckboxChange} name="ipSensitive" />}
                            label="Is this compound IP-sensitive?"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={formState.externalDisclosureRisk} onChange={onDisclosureRiskChange} name="externalDisclosureRisk" />}
                            label="External Disclosure Risk?"
                        />
                        <TextField
                            label="Disclosure Risk Comment"
                            name="disclosureCommentText"
                            value={formState.disclosureCommentText}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                            multiline
                            rows={4}
                            hidden={!formState.externalDisclosureRisk}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box className="fieldset" sx={{ marginBottom: 2.4 }}>
                        <Typography variant="subtitle1" gutterBottom>Section 4: Supporting Documents</Typography>
                        <TextField
                            label="Supporting Protocol (PDF/DOCX)"
                            name="supportingProtocol"
                            type="file"
                            onChange={handleFileChange}
                            fullWidth
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ accept: '.pdf,.docx', multiple: true }}
                        />
                        <TextField
                            label="References"
                            name="references"
                            value={formState.references}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                            multiline
                            rows={4}
                        />
                        <TextField
                            label="Analogue Compounds"
                            name="analogueCompounds"
                            type="file"
                            onChange={handleFileChange}
                            fullWidth
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ accept: '.mol,.sdf,.txt' }}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ marginTop: 2.4 }}>
                <Button variant="contained" color="primary" onClick={onSaveDraft} sx={{ marginRight: 1.2 }}>
                    Save Draft
                </Button>
                <Button variant="contained" color="success" onClick={onPreview} sx={{ marginRight: 1.2 }}>
                    Preview
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmitRequest} disabled={Object.keys(errors).length > 0}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default CompoundRequestForm;