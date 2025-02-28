import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Donees() {
  const [regions, setRegions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ id_data: null, type: '', region: '', date: '', nombre: '' });

  useEffect(() => {
    fetch("http://localhost:4000/api/regions")
      .then(response => response.json())
      .then(data => setRegions(data))
      .catch(error => console.error("Erreur lors de la récupération des régions:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/api/categories")
      .then(response => response.json())
      .then(data => setCategories([{ id: 0, name: "Tous" }, ...data]))
      .catch(error => console.error("Erreur lors de la récupération des catégories:", error));
  }, []);

  const fetchData = () => {
    fetch("http://localhost:4000/api/data/")
      .then(response => response.json())
      .then(data => setTableData(data))
      .catch(error => console.error("Erreur lors de la récupération des données:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const handleShowModal = (index = null, entry = { id_data: null, type: '', region: '', date: '', nombre: '' }) => {
    setEditIndex(index);
    setFormData(entry);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const url = formData.id_data ? `http://localhost:4000/api/data/${formData.id_data}` : "http://localhost:4000/api/data/post";
    const method = formData.id_data ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        region_id: regions.find(r => r.nom === formData.region)?.id,
        categories_id: categories.find(c => c.name === formData.type)?.id,
        nombre: formData.nombre,
        date: formData.date
      })
    })
      .then(response => response.json())
      .then(() => fetchData())
      .catch(error => console.error("Erreur lors de l'ajout/modification des données:", error));
    
    handleCloseModal();
  };

  const handleConfirmDelete = (id) => {
    setEntryToDelete(id);
    setShowConfirmModal(true);
  };

  const handleDelete = () => {
    if (entryToDelete) {
      fetch(`http://localhost:4000/api/data/${entryToDelete}`, {
        method: "DELETE"
      })
        .then(() => fetchData())
        .catch(error => console.error("Erreur lors de la suppression des données:", error));
      
      setShowConfirmModal(false);
      setEntryToDelete(null);
    }
  };

  const handleSubtractValue = (id, currentValue) => {
    const newValue = Math.max(0, currentValue - 1);

    fetch(`http://localhost:4000/api/data/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: newValue })
    })
      .then(() => fetchData())
      .catch(error => console.error("Erreur lors de la mise à jour des données:", error));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Données</h2>
      <div className="d-flex align-items-center mb-3">
        <Dropdown className="me-2">
          <Dropdown.Toggle variant="primary">{selectedCategory}</Dropdown.Toggle>
          <Dropdown.Menu>
            {categories.map((category) => (
              <Dropdown.Item key={category.id} onClick={() => setSelectedCategory(category.name)}>
                {category.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="success" onClick={() => handleShowModal()}>Ajouter</Button>
      </div>
      <Table striped bordered hover className="shadow-sm">
        <thead>
          <tr>
            <th>Type</th>
            <th>Région</th>
            <th>Date</th>
            <th>Nombre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.filter(entry => selectedCategory === "Tous" || categories.find(c => c.id === entry.categories_id)?.name === selectedCategory).map((entry, index) => (
            <tr key={index}>
              <td>{categories.find(c => c.id === entry.categories_id)?.name}</td>
              <td>{regions.find(r => r.id === entry.region_id)?.nom}</td>
              <td>{formatDate(entry.date)}</td>
              <td>{entry.nombre}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShowModal(index, entry)}>Modifier</Button>
                <Button variant="info" size="sm" className="ms-2" onClick={() => handleSubtractValue(entry.id_data, entry.nombre)}>➖</Button>
                <Button variant="danger" size="sm" className="ms-2" onClick={() => handleConfirmDelete(entry.id_data)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal pour Ajouter / Modifier */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Modifier' : 'Ajouter'} une entrée</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="number" name="nombre" value={formData.nombre} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Annuler</Button>
          <Button variant="primary" onClick={handleSubmit}>Enregistrer</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmation pour la suppression */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Êtes-vous sûr de vouloir supprimer cette entrée ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Annuler</Button>
          <Button variant="danger" onClick={handleDelete}>Supprimer</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
