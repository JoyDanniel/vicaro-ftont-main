import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, Label, TextInput } from "flowbite-react"
import { HiOutlineDocumentAdd, HiOutlineSearch } from "react-icons/hi";
import { FaRegTimesCircle } from 'react-icons/fa';
import { getAllProducer } from '../../redux/producerReducer';
import NewProducer from "./NewProducer";
import AddProduct from "./AddProduct";
import swal from 'sweetalert2';
import Loading from "../Global/Loading";
import { useTranslation } from "react-i18next";

function Product(props) {
    const { t } = useTranslation();
    const { globalState, producerState } = useSelector((state) => state);
    const { producers, getAllProducerState } = producerState;

    const dispatch = useDispatch();

    useEffect(() => {
    }, [])


    const [modalShow, setModalShow] = useState(false);    //modal modalShow hide
    const [producer, setProducer] = useState(null);    //modal modalShow hide
    const [search, setSearch] = useState("");   //search bar text 
    const [searchResShow, setSearchResShow] = useState(false);

    const changeSearch = (e) => {
        setSearch(e.target.value);
        setProducer(null);
        dispatch(getAllProducer(e.target.value));
        if (e.target.value) {
            setSearchResShow(true);
        } else {
            setSearchResShow(false);
        }
    }

    const selectProducer = (_id, name) => {
        setSearch(name);
        setProducer({ _id, name });
        setSearchResShow(false);

        //_id code here

    }

    const closeModal = () => {
        swal.fire({
            title: t("swal_are_you_sure"),
            text: t("swal_leave_page"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: t("swal_leave")
        })
            .then(result => {
                if (result.isConfirmed) {
                    close();
                }
            });

    }

    const closeModalWithOutSwal = () => {
        close();
    }

    function close() {
        setModalShow(false);
        setSearch("");
        setSearchResShow(false);
        setProducer(null)
    }

    return (
        <React.Fragment>
            <Button onClick={() => setModalShow(true)} outline={true} className="bg-sitebg-50" >
                <HiOutlineDocumentAdd className="mr-2 h-6 w-6 text-sitebg-50" />
                {t("add_new_product")}
            </Button>
            <Modal
                show={modalShow}
                size="md"
                popup={true}
                onClose={() => closeModal()}
            >
                <Modal.Header>
                    {t("add_new_product")}
                </Modal.Header>
                <hr />
                <Modal.Body>
                    <div className="py-6">
                        <div>
                            <div className="mb-2 ml-2 block">
                                <Label
                                    htmlFor="searchproducer"
                                    value="Search Producer"
                                />
                            </div>
                            <TextInput
                                id="searchproducer"
                                type="search"
                                sizing="lg"
                                placeholder="Search Producer"
                                required={true}
                                icon={HiOutlineSearch}
                                value={search}
                                onChange={(e) => changeSearch(e)}
                            />
                            {getAllProducerState && <Loading />}
                            {
                                searchResShow && <>
                                    <div className="max-h-72 overflow-auto">
                                        {producers?.length > 0 && producers.map((data, index) =>
                                            <div className="text-sm" key={index} onClick={() => selectProducer(data._id, data.name)}>
                                                <div className="grid grid-cols-2 cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                                                    <div className="flex-grow font-medium px-2">{data.name}</div>
                                                    <div className="text-sm font-normal text-gray-500 tracking-wide">{data.country?.name[`${globalState.language}`] + ", " + data.region?.name[`${globalState.language}`]}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <NewProducer closePrevModal={closeModalWithOutSwal} condition={props.condition} />

                                </>
                            }

                        </div>

                        <div className="mt-2 ml-2 text-sm block text-sitetx-100">
                            {t("not_producer_create_new")}
                        </div>
                    </div>
                </Modal.Body>
                <hr />
                <Modal.Footer>
                    <div className="flex flex-wrap items-center gap-4 m-auto">
                        <div>
                            <Button onClick={() => closeModal()} className="bg-white bg-opacity-0 text-sitetx-100">
                                <FaRegTimesCircle className="mr-2 h-5 w-5" />
                                {t("dismiss")}
                            </Button>
                        </div>
                        <div>
                            <AddProduct producer={producer} closePrevModal={closeModalWithOutSwal} type="fromProduct" condition={props.condition} />
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

export default Product;
