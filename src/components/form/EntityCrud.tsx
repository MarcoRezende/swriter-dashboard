import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading } from '@chakra-ui/layout';

import { useEntity } from '../../hooks/entity';
import { CrudModel } from '../../models/crud.model';
import { EntityField, FieldType } from './EntityField';
import { retrieveValueOnly } from './fields/BaseSelect';
import AsyncComponenteWrapper from '../base/AsyncComponenteWrapper';

interface FormProps<T> {
  idName?: string;
  formFields: string[];
  title: string;
  mode?: 'edit' | 'create';
  model: CrudModel<T>;
}

type GenericEntity = {
  [key: string]: any;
};

export function EntityCrud<Entity>({
  idName,
  formFields,
  title,
  model,
  mode = 'create',
}: FormProps<Entity>) {
  const [loading, setLoading] = useState({
    updatingOrCreating: false,
    deleting: false,
  });
  const [isLoadingEntity, setIsLoadingEntity] = useState<boolean>(true);
  const [entity, setEntity] = useState<GenericEntity>({} as GenericEntity);
  const { loadRelationOptions } = useEntity();
  const {
    data: fields,
    error: loadRelationError,
    isLoading: isLoadingRelations,
  } = loadRelationOptions(model, formFields);
  const {
    handleSubmit,
    register,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const entityId = router.query[idName as string] as string | undefined;

  const onSubmit = async (rawData: any) => {
    // retrieve only the value from select
    const data = retrieveValueOnly<Entity>(rawData);
    setLoading({ ...loading, updatingOrCreating: true });

    try {
      if (isCreateMode) {
        await model.create(data);
        reset();
      } else {
        await model.patch(entityId ?? '', data);
      }

      // redirect to entity table
      router.push(router.pathname.split('/').slice(0, 2).join('/'));
    } catch (err) {
      console.error(err);
    }

    setLoading({ ...loading, updatingOrCreating: false });
  };

  const deleteOne = useCallback(async () => {
    setLoading({ ...loading, deleting: true });

    try {
      await model.delete(entityId ?? '');
      router.push(router.pathname.split('/').slice(0, 2).join('/'));
    } catch (err) {
      console.error(err);
    }

    setLoading({ ...loading, deleting: false });
  }, [entityId, router, loading, model]);

  useEffect(() => {
    const isEditMode = mode === 'edit';

    const fetchData = async () => {
      try {
        if (entityId && isEditMode) {
          const fetchedEntity = await model.getOne(entityId);
          setEntity(fetchedEntity);
        }

        setIsLoadingEntity(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [entityId, mode, model]);

  const isEditMode = mode === 'edit';
  const isCreateMode = mode === 'create';

  const isLoadingEntityOptions = () => {
    const selectFields = fields?.filter((field) =>
      (['multi-select', 'select'] as FieldType[]).includes(field.type)
    );

    return !selectFields?.every((field) => {
      if (!field.selectKey) {
        throw new Error(`Key is required at select "${field.label}".`);
      }

      return field.selectKey && entity[field.name];
    });
  };

  return (
    <AsyncComponenteWrapper
      error={loadRelationError}
      isLoading={
        isLoadingRelations ||
        (isEditMode && (isLoadingEntity || isLoadingEntityOptions()))
      }
    >
      <Flex
        p="2rem"
        maxW={{ base: '70%', md: '600px' }}
        minH="100%"
        mx="auto"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box w="100%">
          <Heading alignSelf="flex-start" mb="1rem">
            {mode === 'edit' ? 'Editar' : 'Criar'} {title}.
          </Heading>
          <Box
            w="100%"
            as="form"
            bg="gray.800"
            boxShadow="xl"
            borderRadius="0.5rem"
            p="2rem"
            onSubmit={handleSubmit(onSubmit)}
          >
            {fields?.map((field) => (
              <EntityField
                field={field}
                setValue={setValue}
                entity={entity}
                register={register}
                errors={errors}
                isEditMode={isEditMode}
                control={control}
                key={'field-' + field.name}
              />
            ))}
            <Flex gridGap={'10px'}>
              {mode === 'edit' ? (
                <>
                  <Button
                    onClick={() => deleteOne()}
                    bg="red.800"
                    w="100%"
                    mt={4}
                    isLoading={loading.deleting}
                    _hover={{
                      bg: 'red.700',
                    }}
                  >
                    Deletar
                  </Button>

                  <Button
                    bg="green.700"
                    w="100%"
                    mt={4}
                    isLoading={loading.updatingOrCreating}
                    type="submit"
                    _hover={{
                      bg: 'green.600',
                    }}
                  >
                    Atualizar
                  </Button>
                </>
              ) : (
                <Button
                  bg="blue.800"
                  w="100%"
                  mt={4}
                  isLoading={loading.updatingOrCreating}
                  type="submit"
                  _hover={{
                    bg: 'blue.700',
                  }}
                >
                  Criar
                </Button>
              )}
            </Flex>
          </Box>
        </Box>
      </Flex>
    </AsyncComponenteWrapper>
  );
}
